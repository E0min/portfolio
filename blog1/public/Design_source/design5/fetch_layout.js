
const fs = require('fs');

require('dotenv').config();

const FILE_KEY = process.env.FILE_KEY;
const NODE_ID = process.argv[2] || process.env.NODE_ID;
const TOKEN = process.env.TOKEN;

async function fetchNode(retries = 3) {
    const url = `https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(NODE_ID)}&depth=1`;
    console.log(`Fetching: ${url}`);

    try {
        const response = await fetch(url, {
            headers: { 'X-Figma-Token': TOKEN }
        });

        if (response.status === 429) {
            const retryAfter = parseInt(response.headers.get('Retry-After') || '10', 10);
            console.log(`Rate limited. Waiting ${retryAfter}s...`);
            await new Promise(r => setTimeout(r, retryAfter * 1000 + 1000));
            return fetchNode(retries - 1);
        }

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        const root = data.nodes[NODE_ID.replace(':', ':')]; // access dict key

        // Output critical layout info
        const info = {
            id: root.document.id,
            name: root.document.name,
            width: root.document.absoluteBoundingBox.width,
            height: root.document.absoluteBoundingBox.height,
            backgroundColor: root.document.fills[0]?.color,
            children: root.document.children.map(c => ({
                id: c.id,
                name: c.name,
                type: c.type,
                x: c.absoluteBoundingBox.x - root.document.absoluteBoundingBox.x, // Relative X
                y: c.absoluteBoundingBox.y - root.document.absoluteBoundingBox.y, // Relative Y
                width: c.absoluteBoundingBox.width,
                height: c.absoluteBoundingBox.height,
                text: c.name, // Simplified, finding text content is harder here without deeper parsing but name usually helps
                style: c.style // Font info if available
            }))
        };

        fs.writeFileSync('layout_info.json', JSON.stringify(info, null, 2));
        console.log('Successfully saved layout_info.json');
        console.log(`Frame Size: ${info.width}x${info.height}`);
        console.log(`Found ${info.children.length} children.`);

    } catch (error) {
        console.error('Error:', error);
    }
}

fetchNode();
