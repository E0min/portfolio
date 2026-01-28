'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
    chart: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');

    useEffect(() => {
        const renderDiagram = async () => {
            if (!chart) return;

            try {
                mermaid.initialize({
                    startOnLoad: false,
                    theme: 'default',
                    securityLevel: 'loose',
                });

                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                const { svg } = await mermaid.render(id, chart);
                setSvg(svg);
            } catch (error) {
                console.error('Mermaid rendering error:', error);
                setSvg(`<pre style="color: red;">Error rendering diagram: ${error}</pre>`);
            }
        };

        renderDiagram();
    }, [chart]);

    return (
        <div
            ref={ref}
            style={{
                marginBottom: 'var(--spacing-lg)',
                border: 'var(--border-thin)',
                padding: 'var(--spacing-md)',
                backgroundColor: '#ffffff',
                overflowX: 'auto'
            }}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
};

export default Mermaid;
