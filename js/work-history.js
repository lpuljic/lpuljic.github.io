/**
 * Work history timeline interaction - adds hover effects to job items
 * Animates progress lines and highlights dots when hovering over job entries
 */
document.addEventListener('DOMContentLoaded', function() {
    const jobItems = document.querySelectorAll('.job-item-group');

    /**
     * Find the next job-item-group sibling
     */
    function findNextJob(element) {
        let nextElement = element.nextElementSibling;
        if (nextElement && nextElement.classList.contains('job-item-group')) {
            return nextElement;
        }
        return null;
    }

    /**
     * Find the next job-item-group sibling that contains a progress line
     */
    function findNextJobWithProgressLine(element) {
        let nextElement = element.nextElementSibling;
        while (nextElement) {
            if (nextElement.classList.contains('job-item-group') && nextElement.querySelector('.progress-line')) {
                return nextElement;
            }
            nextElement = nextElement.nextElementSibling;
        }
        return null;
    }

    /**
     * Find the previous job-item-group sibling that contains a progress line
     */
    function findPreviousJobWithProgressLine(element) {
        let previousElement = element.previousElementSibling;
        while (previousElement) {
            if (previousElement.classList.contains('job-item-group') && previousElement.querySelector('.progress-line')) {
                return previousElement;
            }
            previousElement = previousElement.previousElementSibling;
        }
        return null;
    }

    /**
     * Clear all active states from job items
     */
    function clearAllStates() {
        jobItems.forEach(function(item) {
            item.classList.remove('animate-previous');
            const dot = item.querySelector('.job-dot');
            if (dot) {
                dot.classList.remove('active-dot');
                dot.style.animation = '';
            }
        });
    }

    jobItems.forEach(function(jobItem) {
        jobItem.addEventListener('mouseenter', function() {
            const hasProgressLine = this.querySelector('.progress-line');
            
            // Always highlight this job's own dot
            const currentDot = this.querySelector('.job-dot');
            if (currentDot) {
                // Reset animation by clearing and reapplying it
                currentDot.style.animation = 'none';
                void currentDot.offsetWidth; // Force reflow
                currentDot.style.animation = 'activateDot 1500ms ease-out forwards';
            }

            if (hasProgressLine) {
                // Check if there's a previous job with progress line
                const previousJob = findPreviousJobWithProgressLine(this);
                
                if (previousJob) {
                    // Has previous job - animate the line going UP to it
                    previousJob.classList.add('animate-previous');
                    const previousDot = previousJob.querySelector('.job-dot');
                    if (previousDot) {
                        previousDot.style.animation = 'none';
                        void previousDot.offsetWidth; // Force reflow
                        previousDot.style.animation = 'activateDot 1500ms ease-out forwards';
                    }
                } else {
                    // No previous job - animate this job's own line (going DOWN)
                    this.classList.add('animate-previous');
                    
                    // Highlight the immediate next job's dot
                    const nextJob = findNextJob(this);
                    if (nextJob) {
                        const nextDot = nextJob.querySelector('.job-dot');
                        if (nextDot) {
                            nextDot.style.animation = 'none';
                            void nextDot.offsetWidth; // Force reflow
                            nextDot.style.animation = 'activateDot 1500ms ease-out forwards';
                        }
                    }
                }
            } else {
                // Current job has no progress line - find adjacent job with one
                const previousJob = findPreviousJobWithProgressLine(this);
                if (previousJob) {
                    previousJob.classList.add('animate-previous');
                    const previousDot = previousJob.querySelector('.job-dot');
                    if (previousDot) {
                        previousDot.style.animation = 'none';
                        void previousDot.offsetWidth; // Force reflow
                        previousDot.style.animation = 'activateDot 1500ms ease-out forwards';
                    }
                } else {
                    // If no previous job, check the next job
                    const nextJob = findNextJobWithProgressLine(this);
                    if (nextJob) {
                        nextJob.classList.add('animate-previous');
                        const nextDot = nextJob.querySelector('.job-dot');
                        if (nextDot) {
                            nextDot.style.animation = 'none';
                            void nextDot.offsetWidth; // Force reflow
                            nextDot.style.animation = 'activateDot 1500ms ease-out forwards';
                        }
                    }
                }
            }
        });

        jobItem.addEventListener('mouseleave', clearAllStates);
    });
});
