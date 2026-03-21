// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Handle navigation based on the target
            handleNavigation(targetId);
        });
    });
    
    // Handle navigation
    function handleNavigation(section) {
        switch(section) {
            case 'inicio':
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                break;
            case 'info':
                // Scroll to about section
                const aboutSection = document.querySelector('.about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
                break;
            case 'work':
                // Scroll to projects section
                const projectsSection = document.querySelector('.projects');
                if (projectsSection) {
                    projectsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                break;
            case 'contact':
                // For now, scroll to bottom or show contact info
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
                break;
            default:
                console.log(`Navigating to: ${section}`);
        }
    }
    
    // Add click functionality to project placeholders
    const projectPlaceholders = document.querySelectorAll('.project-placeholder');
    
    projectPlaceholders.forEach((placeholder, index) => {
        placeholder.style.cursor = 'pointer';
        
        placeholder.addEventListener('click', function() {
            const projectItem = this.closest('.project-item');
            const projectTitle = projectItem.querySelector('h3').textContent;
            showProjectModal(projectTitle, index);
        });
        
        // Add hover effect
        placeholder.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        placeholder.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Create modal for project details
    function showProjectModal(projectTitle, index) {
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
                <h2>${projectTitle}</h2>
                <div class="modal-placeholder"></div>
                <p>${getProjectDescription(projectTitle)}</p>
                <div class="modal-actions">
                    <button class="btn-primary">View Project</button>
                    <button class="btn-secondary">Close</button>
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
                    background: rgba(0, 0, 0, 0.95);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    opacity: 0;
                    animation: fadeIn 0.3s ease forwards;
                }
                
                .modal-content {
                    background: #000;
                    border: 1px solid #fff;
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
                    color: #fff;
                    transition: color 0.3s ease;
                }
                
                .close-modal:hover {
                    color: #00CED1;
                }
                
                .modal-content h2 {
                    font-size: 2.5rem;
                    margin-bottom: 20px;
                    text-transform: uppercase;
                    letter-spacing: -0.01em;
                }
                
                .modal-placeholder {
                    width: 100%;
                    height: 300px;
                    background-color: #00CED1;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }
                
                .modal-content p {
                    color: #fff;
                    line-height: 1.6;
                    margin-bottom: 30px;
                    font-size: 1.1rem;
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
                    text-transform: uppercase;
                }
                
                .btn-primary {
                    background: #00CED1;
                    color: #000;
                }
                
                .btn-primary:hover {
                    background: #00a8a8;
                    transform: translateY(-2px);
                }
                
                .btn-secondary {
                    background: transparent;
                    color: #fff;
                    border: 1px solid #fff;
                }
                
                .btn-secondary:hover {
                    background: #fff;
                    color: #000;
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
                    
                    .modal-placeholder {
                        height: 200px;
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
        const closeBtnSecondary = modal.querySelector('.btn-secondary');
        
        closeBtn.addEventListener('click', closeModal);
        closeBtnSecondary.addEventListener('click', closeModal);
        
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
    function getProjectDescription(projectTitle) {
        const descriptions = {
            'Tokyo Bloom': 'A vibrant identity project inspired by the blooming culture of Tokyo. This design captures the essence of modern Japanese aesthetics with a contemporary twist, blending traditional elements with cutting-edge design principles.',
            'UTEC': 'A comprehensive brand identity for UTEC, featuring clean lines and modern typography. This project showcases the perfect balance between educational professionalism and innovative thinking.'
        };
        return descriptions[projectTitle] || 'A remarkable design project showcasing creativity and innovation.';
    }
    
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
    
    // Observe elements for animation
    document.querySelectorAll('.project-item').forEach(item => {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });
    
    // Add parallax effect to hero section
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroTitle = document.querySelector('.hero h1');
        
        if (heroTitle) {
            const speed = 0.5;
            heroTitle.style.transform = `translateY(${scrolled * speed}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
    
    // Initialize
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
});
