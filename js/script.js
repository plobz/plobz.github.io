// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Project click functionality
    const projectImages = document.querySelectorAll('.project-image.clickable');
    
    projectImages.forEach(image => {
        image.addEventListener('click', function() {
            const projectName = this.dataset.project;
            handleProjectClick(projectName);
        });
        
        // Add touch support for mobile devices
        image.addEventListener('touchstart', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        image.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Handle project clicks
    function handleProjectClick(projectName) {
        // Create modal or navigate to project details
        showProjectModal(projectName);
    }
    
    // Create modal for project details
    function showProjectModal(projectName) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.project-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal element
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${getProjectTitle(projectName)}</h2>
                <img src="https://picsum.photos/seed/${projectName}-detail/800/600.jpg" alt="${getProjectTitle(projectName)}">
                <p>${getProjectDescription(projectName)}</p>
                <div class="modal-actions">
                    <button class="btn-primary">View Live</button>
                    <button class="btn-secondary">View Code</button>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.appendChild(modal);
        
        // Add modal styles
        const modalStyles = `
            <style>
                .project-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    opacity: 0;
                    animation: fadeIn 0.3s ease forwards;
                }
                
                .modal-content {
                    background: #111;
                    border: 1px solid #333;
                    border-radius: 12px;
                    padding: 40px;
                    max-width: 800px;
                    width: 90%;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                    transform: scale(0.9);
                    animation: scaleIn 0.3s ease 0.1s forwards;
                }
                
                .close-modal {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    font-size: 30px;
                    cursor: pointer;
                    color: #888;
                    transition: color 0.3s ease;
                }
                
                .close-modal:hover {
                    color: #fff;
                }
                
                .modal-content h2 {
                    font-size: 2.5rem;
                    margin-bottom: 20px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                
                .modal-content img {
                    width: 100%;
                    height: auto;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }
                
                .modal-content p {
                    color: #ccc;
                    line-height: 1.6;
                    margin-bottom: 30px;
                }
                
                .modal-actions {
                    display: flex;
                    gap: 20px;
                    flex-wrap: wrap;
                }
                
                .btn-primary, .btn-secondary {
                    padding: 12px 30px;
                    border: none;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: inline-block;
                }
                
                .btn-primary {
                    background: #fff;
                    color: #000;
                }
                
                .btn-primary:hover {
                    background: #ccc;
                    transform: translateY(-2px);
                }
                
                .btn-secondary {
                    background: transparent;
                    color: #fff;
                    border: 1px solid #666;
                }
                
                .btn-secondary:hover {
                    background: #333;
                    border-color: #888;
                    transform: translateY(-2px);
                }
                
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
                
                @keyframes scaleIn {
                    to { transform: scale(1); }
                }
                
                @media (max-width: 768px) {
                    .modal-content {
                        padding: 20px;
                    }
                    
                    .modal-content h2 {
                        font-size: 1.8rem;
                    }
                    
                    .modal-actions {
                        flex-direction: column;
                    }
                    
                    .btn-primary, .btn-secondary {
                        text-align: center;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', modalStyles);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', closeModal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }
    
    // Close modal function
    function closeModal() {
        const modal = document.querySelector('.project-modal');
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }
    
    // Get project information
    function getProjectTitle(projectName) {
        const titles = {
            'vanguard': 'Vanguard',
            'fabric': 'Fabric'
        };
        return titles[projectName] || projectName;
    }
    
    function getProjectDescription(projectName) {
        const descriptions = {
            'vanguard': 'A cutting-edge cryptocurrency platform that revolutionizes digital asset management with advanced security features and intuitive user interface. Built with modern web technologies to provide seamless trading experience.',
            'fabric': 'An innovative fintech solution that simplifies financial transactions and provides comprehensive analytics for businesses. Features real-time data processing and intelligent financial insights.'
        };
        return descriptions[projectName] || 'A remarkable project showcasing modern design and development capabilities.';
    }
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Handle navigation to different pages or sections
                handleNavigation(targetId);
            }
        });
    });
    
    // Handle navigation
    function handleNavigation(section) {
        // For now, just show a message or implement page navigation
        console.log(`Navigating to: ${section}`);
        // You can implement actual page navigation here
    }
    
    // Add scroll effects
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe project items for animation
    document.querySelectorAll('.project-item').forEach(item => {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });
    
    // Responsive menu for mobile
    function createMobileMenu() {
        if (window.innerWidth <= 768) {
            // Add mobile menu functionality if needed
            const nav = document.querySelector('nav');
            if (!nav.querySelector('.mobile-menu-toggle')) {
                const menuToggle = document.createElement('button');
                menuToggle.className = 'mobile-menu-toggle';
                menuToggle.innerHTML = '☰';
                menuToggle.style.cssText = `
                    display: none;
                    background: none;
                    border: none;
                    color: #fff;
                    font-size: 24px;
                    cursor: pointer;
                `;
                
                nav.insertBefore(menuToggle, nav.firstChild);
                
                menuToggle.addEventListener('click', function() {
                    nav.classList.toggle('mobile-open');
                });
            }
        }
    }
    
    // Initialize mobile menu
    createMobileMenu();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        createMobileMenu();
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.animation = 'fadeIn 0.5s ease';
        });
    });
});
