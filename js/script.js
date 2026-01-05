// Navigation Active State Management
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Indicator Click
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    document.querySelector('#work').scrollIntoView({
        behavior: 'smooth'
    });
});

// Tools Container Drag Functionality
const toolsContainer = document.getElementById('toolsContainer');
const scrollBarIndicator = document.querySelector('.scroll-bar-indicator');
let isDragging = false;
let startX;
let scrollLeft;

// Duplicate tools for infinite scroll effect
const tools = toolsContainer.innerHTML;
toolsContainer.innerHTML = tools + tools;

// Update scroll bar position based on container scroll
function updateScrollBar() {
    if (!toolsContainer || !scrollBarIndicator) return;
    
    const scrollPercentage = toolsContainer.scrollLeft / (toolsContainer.scrollWidth - toolsContainer.clientWidth);
    const maxTranslate = 300; // This matches the 300% in CSS animation
    scrollBarIndicator.style.transform = `translateX(${scrollPercentage * maxTranslate}%)`;
}

toolsContainer.addEventListener('scroll', updateScrollBar);

toolsContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - toolsContainer.offsetLeft;
    scrollLeft = toolsContainer.scrollLeft;
    toolsContainer.style.cursor = 'grabbing';
    toolsContainer.style.animationPlayState = 'paused';
    scrollBarIndicator.style.animationPlayState = 'paused';
});

toolsContainer.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        toolsContainer.style.cursor = 'grab';
        toolsContainer.style.animationPlayState = 'running';
        scrollBarIndicator.style.animationPlayState = 'running';
    }
});

toolsContainer.addEventListener('mouseup', () => {
    isDragging = false;
    toolsContainer.style.cursor = 'grab';
    toolsContainer.style.animationPlayState = 'running';
    scrollBarIndicator.style.animationPlayState = 'running';
});

toolsContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - toolsContainer.offsetLeft;
    const walk = (x - startX) * 2;
    toolsContainer.scrollLeft = scrollLeft - walk;
});

toolsContainer.addEventListener('mouseenter', () => {
    toolsContainer.style.animationPlayState = 'paused';
    scrollBarIndicator.style.animationPlayState = 'paused';
});

// Touch events for mobile
toolsContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - toolsContainer.offsetLeft;
    scrollLeft = toolsContainer.scrollLeft;
    toolsContainer.style.animationPlayState = 'paused';
    scrollBarIndicator.style.animationPlayState = 'paused';
});

toolsContainer.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - toolsContainer.offsetLeft;
    const walk = (x - startX) * 2;
    toolsContainer.scrollLeft = scrollLeft - walk;
});

toolsContainer.addEventListener('touchend', () => {
    toolsContainer.style.animationPlayState = 'running';
    scrollBarIndicator.style.animationPlayState = 'running';
});

// Work Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.project-slide');
const dots = document.querySelectorAll('.dot');
let autoSlideInterval;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
    resetAutoSlide();
}

function goToSlide(n) {
    showSlide(n);
    resetAutoSlide();
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// Start auto-sliding when page loads
window.addEventListener('load', startAutoSlide);

// Project Data
const projectsData = {
    'school-education': {
        title: 'School Of Education',
        heroImage: 'https://via.placeholder.com/1200x600?text=School+Of+Education+Hero',
        sections: [
            {
                title: 'The Problem',
                text: 'The School of Education faced challenges with their outdated website, making it difficult for students to navigate course materials and for educators to manage their content. The client, the School of Education administration, identified low engagement rates and high bounce rates as key issues.',
                image: 'https://via.placeholder.com/500x400?text=Problem+Analysis'
            },
            {
                title: 'Audience',
                text: 'Our primary audience included college students aged 18-25, faculty members, and prospective students. Secondary audiences were parents and education industry professionals seeking partnership opportunities.',
                image: 'https://via.placeholder.com/500x400?text=Target+Audience'
            },
            {
                title: 'Testing Original Website',
                text: 'We conducted usability testing with 20 users performing common tasks. Results showed 65% task failure rate, average task completion time of 8 minutes, and significant frustration with navigation structure.',
                image: 'https://via.placeholder.com/500x400?text=Original+Testing'
            },
            {
                title: 'Result of Test',
                text: 'Key findings revealed that users struggled with finding course information, the search functionality was ineffective, and mobile experience was severely limited. Heat maps showed users clicking on non-interactive elements.',
                image: 'https://via.placeholder.com/500x400?text=Test+Results'
            },
            {
                title: 'Solution',
                text: 'We redesigned the information architecture, implemented a robust search system, created a mobile-first responsive design, and developed an intuitive dashboard for both students and faculty.',
                image: 'https://via.placeholder.com/500x400?text=Design+Solution'
            },
            {
                title: 'Testing Solution',
                text: 'After implementing the redesign, we tested with the same user group. Task success rate improved to 92%, average completion time reduced to 2.5 minutes, and user satisfaction scores increased by 78%.',
                image: 'https://via.placeholder.com/500x400?text=Solution+Testing'
            },
            {
                title: 'Feedback',
                text: 'Users praised the clean interface, intuitive navigation, and quick access to important information. Faculty appreciated the streamlined content management. Students highlighted the improved mobile experience.',
                image: 'https://via.placeholder.com/500x400?text=User+Feedback'
            },
            {
                title: 'Final Product',
                text: 'The final product launched in Fall 2024, resulting in a 150% increase in daily active users, 45% reduction in support tickets, and overwhelmingly positive feedback from all stakeholder groups.',
                image: 'https://via.placeholder.com/500x400?text=Final+Product'
            }
        ]
    },
    'national-parks': {
        title: 'National Parks',
        heroImage: 'https://via.placeholder.com/1200x600?text=National+Parks+Hero',
        sections: [
            {
                title: 'The Problem',
                text: 'The National Parks Service needed a modern digital platform to help visitors plan their trips and learn about park features. The existing website was text-heavy, lacked visual appeal, and didn\'t provide interactive mapping capabilities.',
                image: 'https://via.placeholder.com/500x400?text=Parks+Problem'
            },
            {
                title: 'Audience',
                text: 'Target users included families planning vacations, outdoor enthusiasts, photographers, and educational groups. Age range 25-65, tech-savvy but valuing simplicity in nature settings.',
                image: 'https://via.placeholder.com/500x400?text=Park+Visitors'
            },
            {
                title: 'Testing Original Website',
                text: 'Field testing with park visitors revealed difficulty finding trail information, confusion about amenities, and frustration with non-mobile-friendly design. 70% of users reported using mobile devices on-site.',
                image: 'https://via.placeholder.com/500x400?text=Field+Testing'
            },
            {
                title: 'Result of Test',
                text: 'Data showed users needed quick access to trail maps, real-time updates on conditions, easy-to-find facility information, and offline capabilities for areas with limited connectivity.',
                image: 'https://via.placeholder.com/500x400?text=Testing+Data'
            },
            {
                title: 'Solution',
                text: 'Developed a mobile-first web app with interactive maps, offline capabilities, real-time updates, beautiful photography showcasing each park, and integrated booking system for campsites and tours.',
                image: 'https://via.placeholder.com/500x400?text=Parks+Solution'
            },
            {
                title: 'Testing Solution',
                text: 'Beta testing with 100 visitors showed 95% satisfaction rate, successful offline functionality, and average session time of 12 minutes. Users particularly loved the visual design and map features.',
                image: 'https://via.placeholder.com/500x400?text=Beta+Testing'
            },
            {
                title: 'Feedback',
                text: 'Visitors appreciated the stunning visuals, easy navigation, and practical features. Park rangers noted fewer basic questions from visitors, indicating better pre-visit preparation.',
                image: 'https://via.placeholder.com/500x400?text=Visitor+Feedback'
            },
            {
                title: 'Final Product',
                text: 'Launched nationwide, the platform now serves 2 million annual users, increased campsite bookings by 35%, and won awards for accessibility and user experience in the public sector.',
                image: 'https://via.placeholder.com/500x400?text=Parks+Final'
            }
        ]
    },
    'uvu-sculpt': {
        title: 'UVU SCULPT',
        heroImage: 'https://via.placeholder.com/1200x600?text=UVU+SCULPT+Hero',
        sections: [
            {
                title: 'The Problem',
                text: 'UVU\'s 3D modeling students lacked a dedicated platform to showcase their work and connect with industry professionals. The client, UVU\'s Digital Media department, wanted to create opportunities for student networking and recruitment.',
                image: 'https://via.placeholder.com/500x400?text=SCULPT+Problem'
            },
            {
                title: 'Audience',
                text: 'Primary users were UVU students in 3D modeling and animation programs. Secondary users included recruiters, industry professionals, and prospective students interested in the program.',
                image: 'https://via.placeholder.com/500x400?text=Student+Artists'
            },
            {
                title: 'Testing Original Website',
                text: 'Initial research included student surveys and competitive analysis of portfolio platforms. Students reported difficulty showcasing 3D work effectively and desired integrated 3D viewers.',
                image: 'https://via.placeholder.com/500x400?text=Student+Research'
            },
            {
                title: 'Result of Test',
                text: 'Findings showed need for 3D model viewers, high-quality rendering previews, easy portfolio creation, social features for collaboration, and integration with industry-standard software.',
                image: 'https://via.placeholder.com/500x400?text=Research+Findings'
            },
            {
                title: 'Solution',
                text: 'Created a comprehensive platform with WebGL 3D viewers, drag-and-drop portfolio builder, community features, project collaboration tools, and direct integration with Blender and Maya.',
                image: 'https://via.placeholder.com/500x400?text=SCULPT+Design'
            },
            {
                title: 'Testing Solution',
                text: 'Prototype testing with 30 students showed high engagement, successful 3D model uploads, and positive feedback on the portfolio customization features. Load times met performance targets.',
                image: 'https://via.placeholder.com/500x400?text=Prototype+Test'
            },
            {
                title: 'Feedback',
                text: 'Students loved the professional look of their portfolios and the ability to showcase 3D work interactively. Faculty praised the platform for facilitating student collaboration and industry connections.',
                image: 'https://via.placeholder.com/500x400?text=Community+Response'
            },
            {
                title: 'Final Product',
                text: 'Platform launched with 200+ student portfolios, facilitated 15 industry recruitment connections in first semester, and became integral to the Digital Media program\'s curriculum.',
                image: 'https://via.placeholder.com/500x400?text=SCULPT+Launch'
            }
        ]
    },
    'timpanogos-cave': {
        title: 'Timpanogos Cave',
        heroImage: 'https://via.placeholder.com/1200x600?text=Timpanogos+Cave+Hero',
        sections: [
            {
                title: 'The Problem',
                text: 'Timpanogos Cave National Monument needed an engaging way to educate visitors about cave geology and formations. The client wanted to enhance the visitor experience while preserving the cave environment.',
                image: 'https://via.placeholder.com/500x400?text=Cave+Challenge'
            },
            {
                title: 'Audience',
                text: 'Target audience included families with children aged 8-16, school groups, and geology enthusiasts. Visitors ranged from casual tourists to serious cave explorers and students.',
                image: 'https://via.placeholder.com/500x400?text=Cave+Visitors'
            },
            {
                title: 'Testing Original Website',
                text: 'Visitor surveys and observation studies revealed that educational materials were too technical for general audiences and didn\'t engage younger visitors effectively.',
                image: 'https://via.placeholder.com/500x400?text=Visitor+Studies'
            },
            {
                title: 'Result of Test',
                text: 'Research indicated need for interactive learning experiences, age-appropriate content levels, visual representations of geological processes, and gamification elements to increase engagement.',
                image: 'https://via.placeholder.com/500x400?text=Study+Results'
            },
            {
                title: 'Solution',
                text: 'Developed an AR mobile app featuring interactive cave formation identification, 3D geological timelines, age-appropriate content modes, educational games, and virtual cave tours for accessibility.',
                image: 'https://via.placeholder.com/500x400?text=AR+Solution'
            },
            {
                title: 'Testing Solution',
                text: 'Field testing with 50 visitors showed increased learning retention, high engagement from children, and positive feedback on AR features. Average app usage time was 25 minutes per visit.',
                image: 'https://via.placeholder.com/500x400?text=Field+Testing'
            },
            {
                title: 'Feedback',
                text: 'Parents appreciated educational value, teachers praised curriculum alignment, and park rangers noted improved visitor understanding. Children particularly enjoyed the AR scavenger hunt feature.',
                image: 'https://via.placeholder.com/500x400?text=Educational+Impact'
            },
            {
                title: 'Final Product',
                text: 'App downloaded 5,000+ times in first season, educational assessment scores improved 40%, and won state award for innovative use of technology in natural resource education.',
                image: 'https://via.placeholder.com/500x400?text=Cave+Success'
            }
        ]
    }
};

// Navigate to Project Details
function navigateToProject(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    const projectContent = document.getElementById('projectContent');
    
    let sectionsHTML = '';
    project.sections.forEach(section => {
        sectionsHTML += `
            <div class="project-detail-section">
                <h3 class="section-title">${section.title}</h3>
                <div class="section-content">
                    <p class="section-text">${section.text}</p>
                    <div class="section-image">
                        <img src="${section.image}" alt="${section.title}">
                    </div>
                </div>
            </div>
        `;
    });

    projectContent.innerHTML = `
        <div class="project-detail-header">
            <h1 class="project-detail-title">${project.title}</h1>
            <div class="project-detail-hero">
                <img src="${project.heroImage}" alt="${project.title}">
            </div>
        </div>
        ${sectionsHTML}
    `;

    document.getElementById('projectDetails').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Scroll to top of project details
    document.getElementById('projectDetails').scrollTop = 0;
}

// Back to Work Section
function backToWork() {
    document.getElementById('projectDetails').classList.add('hidden');
    document.body.style.overflow = 'auto';
    
    // Scroll back to work section
    document.querySelector('#work').scrollIntoView({
        behavior: 'smooth'
    });
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    const projectDetails = document.getElementById('projectDetails');
    
    if (!projectDetails.classList.contains('hidden')) {
        if (e.key === 'Escape') {
            backToWork();
        }
    } else {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    }
});

// Pause auto-slide when user hovers over carousel
document.querySelector('.work-carousel')?.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

document.querySelector('.work-carousel')?.addEventListener('mouseleave', () => {
    startAutoSlide();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
    showSlide(0);
});