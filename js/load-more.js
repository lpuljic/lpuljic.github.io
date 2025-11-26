document.addEventListener('DOMContentLoaded', function() {
    // Load configuration from data attributes
    const workContainer = document.getElementById('work-history-container');
    const blogContainer = document.getElementById('blog-posts-container');
    
    const CONFIG = {
        initialVisibleWork: workContainer ? parseInt(workContainer.getAttribute('data-initial-visible')) : 10,
        loadMoreWorkIncrement: workContainer ? parseInt(workContainer.getAttribute('data-increment')) : 3,
        initialVisibleBlogs: blogContainer ? parseInt(blogContainer.getAttribute('data-initial-visible')) : 10,
        loadMoreBlogIncrement: blogContainer ? parseInt(blogContainer.getAttribute('data-increment')) : 3
    };
    
    // Load more for work history
    const loadMoreWorkBtn = document.getElementById('load-more-work');
    const showLessWorkBtn = document.getElementById('show-less-work');
    
    if (loadMoreWorkBtn) {
        loadMoreWorkBtn.addEventListener('click', function() {
            const hiddenItems = document.querySelectorAll('.work-history-item.hidden');
            const itemsToShow = CONFIG.loadMoreWorkIncrement;
            let shown = 0;
            
            hiddenItems.forEach(item => {
                if (shown < itemsToShow) {
                    item.classList.remove('hidden');
                    shown++;
                }
            });
            
            // Hide load more button and show less button if all items are shown
            if (document.querySelectorAll('.work-history-item.hidden').length === 0) {
                loadMoreWorkBtn.style.display = 'none';
                if (showLessWorkBtn) showLessWorkBtn.style.display = 'inline-block';
            }
        });
    }
    
    if (showLessWorkBtn) {
        showLessWorkBtn.addEventListener('click', function() {
            const allItems = document.querySelectorAll('.work-history-item');
            allItems.forEach((item, index) => {
                if (index >= CONFIG.initialVisibleWork) {
                    item.classList.add('hidden');
                }
            });
            showLessWorkBtn.style.display = 'none';
            if (loadMoreWorkBtn) loadMoreWorkBtn.style.display = 'inline-block';
        });
    }
    
    // Load more for blog posts
    const loadMoreBlogBtn = document.getElementById('load-more-blog');
    const showLessBlogBtn = document.getElementById('show-less-blog');
    
    if (loadMoreBlogBtn) {
        loadMoreBlogBtn.addEventListener('click', function() {
            const hiddenItems = document.querySelectorAll('.blog-post-item.hidden');
            const itemsToShow = CONFIG.loadMoreBlogIncrement;
            let shown = 0;
            
            hiddenItems.forEach(item => {
                if (shown < itemsToShow) {
                    item.classList.remove('hidden');
                    shown++;
                }
            });
            
            // Hide load more button and show less button if all items are shown
            if (document.querySelectorAll('.blog-post-item.hidden').length === 0) {
                loadMoreBlogBtn.style.display = 'none';
                if (showLessBlogBtn) showLessBlogBtn.style.display = 'inline-block';
            }
        });
    }
    
    if (showLessBlogBtn) {
        showLessBlogBtn.addEventListener('click', function() {
            const allItems = document.querySelectorAll('.blog-post-item');
            allItems.forEach((item, index) => {
                if (index >= CONFIG.initialVisibleBlogs) {
                    item.classList.add('hidden');
                }
            });
            showLessBlogBtn.style.display = 'none';
            if (loadMoreBlogBtn) loadMoreBlogBtn.style.display = 'inline-block';
        });
    }
});
