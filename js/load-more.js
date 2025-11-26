document.addEventListener('DOMContentLoaded', function() {
    /**
     * Setup load more / show less functionality for paginated lists
     * @param {string} containerId - ID of the container element
     * @param {string} itemClass - CSS class for individual items
     * @param {string} loadBtnId - ID of the "load more" button
     * @param {string} lessBtnId - ID of the "show less" button
     * @param {number} defaultInitialVisible - Default items to show initially
     * @param {number} defaultIncrement - Default items to load per click
     */
    function setupLoadMore(containerId, itemClass, loadBtnId, lessBtnId, defaultInitialVisible, defaultIncrement) {
         const container = document.getElementById(containerId);
         const loadBtn = document.getElementById(loadBtnId);
         const lessBtn = document.getElementById(lessBtnId);

         if (!container || !loadBtn) return;

         // Parse configuration from data attributes with safe fallbacks
         const initialVisible = parseInt(container.getAttribute('data-initial-visible'), 10) || defaultInitialVisible;
         const increment = parseInt(container.getAttribute('data-increment'), 10) || defaultIncrement;

         // Initialize visibility on page load
         const allItems = document.querySelectorAll(`.${itemClass}`);
         allItems.forEach((item, index) => {
             if (index < initialVisible) {
                 item.classList.remove('hidden');
             } else {
                 item.classList.add('hidden');
             }
         });

        // Load more functionality
        loadBtn.addEventListener('click', function() {
            const hiddenItems = document.querySelectorAll(`.${itemClass}.hidden`);
            let shown = 0;

            hiddenItems.forEach(item => {
                if (shown < increment) {
                    item.classList.remove('hidden');
                    shown++;
                }
            });

            // Hide load more button and show less button if all items are shown
            if (document.querySelectorAll(`.${itemClass}.hidden`).length === 0) {
                loadBtn.style.display = 'none';
                if (lessBtn) lessBtn.style.display = 'inline-block';
            }
        });

        // Show less functionality
        if (lessBtn) {
            lessBtn.addEventListener('click', function() {
                const allItems = document.querySelectorAll(`.${itemClass}`);
                allItems.forEach((item, index) => {
                    if (index >= initialVisible) {
                        item.classList.add('hidden');
                    }
                });
                lessBtn.style.display = 'none';
                loadBtn.style.display = 'inline-block';
            });
        }
    }

    // Initialize load more for work history
    setupLoadMore('work-history-container', 'work-history-item', 'load-more-work', 'show-less-work', 5, 3);

    // Initialize load more for blog posts
    setupLoadMore('blog-posts-container', 'blog-post-item', 'load-more-blog', 'show-less-blog', 10, 3);
});
