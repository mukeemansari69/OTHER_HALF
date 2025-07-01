

        // Navigation functions
        function openFeaturedStory(storyId) {
            console.log(`Opening featured story: ${storyId}`);
            alert(`Opening featured story: ${storyId}`);
        }

        function openBlogPost(postId) {
            console.log(`Opening blog post: ${postId}`);
            alert(`Opening blog post: ${postId}`);
        }

        function openTopRead(readId) {
            console.log(`Opening top read: ${readId}`);
            alert(`Opening top read: ${readId}`);
        }

        function takeQuiz() {
            console.log('Taking quiz');
            alert('Opening quiz to find the perfect supplement combo!');
        }

        function previousStory() {
            console.log('Navigate to previous story');
            alert('Navigating to previous story');
        }

        function nextStory() {
            console.log('Navigate to next story');
            alert('Navigating to next story');
        }

        // Enhanced functionality
        document.addEventListener('DOMContentLoaded', function () {
            // Keyboard navigation support
            const interactiveElements = document.querySelectorAll('[tabindex="0"]');

            interactiveElements.forEach(element => {
                element.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });

            // Parallax effect for hero section
            const heroSection = document.querySelector('.hero-section');

            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;

                if (heroSection) {
                    heroSection.style.transform = `translateY(${rate}px)`;
                }
            });

            // Lazy loading for images
            const images = document.querySelectorAll('.featured-thumbnail, .blog-card-image, .top-read-thumbnail');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.style.backgroundImage = `url('${img.dataset.src}')`;
                            observer.unobserve(img);
                        }
                    }
                });
            });

            images.forEach(img => {
                imageObserver.observe(img);
            });

            // Reading progress tracking
            let viewedItems = new Set();

            const trackView = (itemId, itemType) => {
                if (!viewedItems.has(itemId)) {
                    viewedItems.add(itemId);
                    console.log(`Viewed ${itemType}: ${itemId}`);
                    // In a real implementation, you would send this data to analytics
                }
            };

            // Track when items come into view
            const viewObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const itemId = element.getAttribute('onclick') || 'unknown';
                        const itemType = element.classList.contains('featured-item') ? 'featured-story' :
                            element.classList.contains('blog-card') ? 'blog-card' :
                                element.classList.contains('top-read-item') ? 'top-read' : 'unknown';

                        trackView(itemId, itemType);
                    }
                });
            }, {threshold: 0.5});

            interactiveElements.forEach(element => {
                viewObserver.observe(element);
            });

            // Handle window resize for responsive adjustments
            let resizeTimeout;
            window.addEventListener('resize', function () {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    console.log('Window resized, adjusting layout if necessary');
                }, 100);
            });

            // Performance optimization: Reduce animations on low-power devices
            if (navigator.deviceMemory && navigator.deviceMemory < 4) {
                document.body.classList.add('reduced-animations');
                const style = document.createElement('style');
                style.textContent = `
                    .reduced-animations * {
                        transition: none !important;
                        animation: none !important;
                    }
                `;
                document.head.appendChild(style);
            }

            // Hero card click handler
            const heroCard = document.querySelector('.hero-card');
            heroCard.addEventListener('click', function () {
                console.log('Hero card clicked');
                alert('Opening full blog post: "What Your Dog\'s Poop is Trying to Tell You"');
            });

            // Add smooth scrolling for better UX
            const smoothScroll = (target) => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            };

            // Search functionality (if needed)
            window.searchBlog = function (query) {
                console.log(`Searching for: ${query}`);
                // Implementation would filter blog posts based on query
            };

            // Social sharing functionality
            window.shareBlog = function (blogId, title) {
                if (navigator.share) {
                    navigator.share({
                        title: title,
                        text: 'Check out this blog post',
                        url: window.location.href + '#' + blogId
                    });
                } else {
                    // Fallback for browsers that don't support Web Share API
                    const url = window.location.href + '#' + blogId;
                    navigator.clipboard.writeText(url).then(() => {
                        alert('Link copied to clipboard!');
                    });
                }
            };

            // Accessibility enhancements
            const announcePage = () => {
                const announcement = document.createElement('div');
                announcement.setAttribute('aria-live', 'polite');
                announcement.setAttribute('aria-atomic', 'true');
                announcement.className = 'sr-only';
                announcement.textContent = 'Blog detail page loaded with hero section, featured stories and top reads';
                document.body.appendChild(announcement);

                setTimeout(() => {
                    document.body.removeChild(announcement);
                }, 1000);
            };

            announcePage();
        });
   