document.addEventListener('DOMContentLoaded', () => {
    console.log('Mean Girls Project Loaded');

    // Example interaction: Log clicks on movie items
    const movies = document.querySelectorAll('.movie-item');
    movies.forEach(movie => {
        movie.addEventListener('click', () => {
            console.log(`Clicked on: ${movie.innerText}`);
        });
    });
    // List Hover interaction
    const listItems = document.querySelectorAll('.large-text-list li');
    const hoverImgContainer = document.querySelector('.list-hover-img');
    const hoverPlaceholder = hoverImgContainer ? hoverImgContainer.querySelector('.placeholder-img') : null;

    if (listItems.length && hoverImgContainer) {
        listItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const imageName = item.getAttribute('data-image');
                // In a real scenario, you'd swap the src here based on imageName
                if (hoverPlaceholder) {
                    hoverPlaceholder.innerText = `Image for ${item.innerText.split(' ')[0]}`; // Just for demo
                    // hoverPlaceholder.style.backgroundImage = `url(images/${imageName}.jpg)`; 
                }
                hoverImgContainer.style.opacity = '1';
            });

            item.addEventListener('mouseleave', () => {
                hoverImgContainer.style.opacity = '0';
            });
        });

        // Optional: Move image with cursor? User said "below text" (z-index) but maybe fixed position is fine.
        // For now, fixed center as per CSS.
    }

    // Grid/List View Toggle
    const btnGrid = document.getElementById('btn-grid-view');
    const btnList = document.getElementById('btn-list-view');
    const viewGrid = document.getElementById('view-grid');
    const viewList = document.getElementById('view-list');

    if (btnGrid && btnList && viewGrid && viewList) {
        btnGrid.addEventListener('click', () => {
            viewGrid.classList.remove('hidden');
            viewList.classList.add('hidden');
        });

        btnList.addEventListener('click', () => {
            viewGrid.classList.add('hidden');
            viewList.classList.remove('hidden');
        });
    }

    // Detail List Cursor Hover Effect
    const listRows = document.querySelectorAll('.list-row');
    const cursorImg = document.getElementById('cursor-img');
    const cursorPlaceholder = cursorImg ? cursorImg.querySelector('.placeholder-img') : null;

    if (listRows.length && cursorImg) {
        // Move cursor image
        document.addEventListener('mousemove', (e) => {
            // Only move if visible to save performance? 
            // Or just update always.
            // Using requestAnimationFrame for smoothness could be better, but direct is ok for simple setup.
            const x = e.clientX;
            const y = e.clientY;
            // Center the image on cursor
            cursorImg.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        });

        listRows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                const imgKey = row.getAttribute('data-image');
                if (cursorPlaceholder) {
                    cursorPlaceholder.innerText = imgKey; // Just for demo
                    // In real app: cursorImg.querySelector('img').src = `images/${imgKey}.jpg`;
                }
                cursorImg.style.opacity = '1';
            });

            row.addEventListener('mouseleave', () => {
                cursorImg.style.opacity = '0';
            });
        });
    }
});
