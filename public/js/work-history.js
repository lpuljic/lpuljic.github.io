document.addEventListener('DOMContentLoaded', function() {
    const jobItems = document.querySelectorAll('.job-item-group');
    
    jobItems.forEach(function(jobItem) {
        jobItem.addEventListener('mouseenter', function() {
            // Check if this job item has a progress line
            const hasProgressLine = this.querySelector('.progress-line');
            
            if (hasProgressLine) {
                // If this job has a progress line, check the immediate next item and activate its dot
                let nextElement = this.nextElementSibling;
                // Skip to next job-item-group if needed
                while (nextElement && !nextElement.classList.contains('job-item-group')) {
                    nextElement = nextElement.nextElementSibling;
                }
                if (nextElement) {
                    const nextDot = nextElement.querySelector('.job-dot');
                    if (nextDot) {
                        nextDot.style.backgroundColor = '#000000';
                    }
                }
                
                // Also animate the previous element with a progress line
                let previousElement = this.previousElementSibling;
                while (previousElement) {
                    const previousProgressLine = previousElement.querySelector('.progress-line');
                    if (previousProgressLine) {
                        previousElement.classList.add('animate-previous');
                        break;
                    }
                    previousElement = previousElement.previousElementSibling;
                }
            } else {
                // If this job doesn't have a progress line, trigger animation on job with one (above or below)
                let previousElement = this.previousElementSibling;
                
                // Check above first
                while (previousElement) {
                    const previousProgressLine = previousElement.querySelector('.progress-line');
                    if (previousProgressLine) {
                        // Trigger the animation by adding a class
                        previousElement.classList.add('animate-previous');
                        return;
                    }
                    previousElement = previousElement.previousElementSibling;
                }
                
                // If not found above, check below
                let nextElement = this.nextElementSibling;
                while (nextElement) {
                    const nextProgressLine = nextElement.querySelector('.progress-line');
                    if (nextProgressLine) {
                        // Trigger the animation by adding a class
                        nextElement.classList.add('animate-previous');
                        // Also change the dot color to black
                        const nextDot = nextElement.querySelector('.job-dot');
                        if (nextDot) {
                            nextDot.style.backgroundColor = '#000000';
                        }
                        return;
                    }
                    nextElement = nextElement.nextElementSibling;
                }
            }
        });
        
        jobItem.addEventListener('mouseleave', function() {
            // Remove the animation class from all job items
            jobItems.forEach(function(item) {
                item.classList.remove('animate-previous');
                const dot = item.querySelector('.job-dot');
                if (dot) {
                    dot.style.backgroundColor = '';
                }
            });
        });
    });
});
