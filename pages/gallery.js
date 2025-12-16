// ==========================================
// GALLERY PAGE INTERACTIONS
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // TAB SWITCHING
    // ==========================================
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryContents = document.querySelectorAll('.gallery-content');

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const targetTab = this.dataset.tab;

            // Remove active class from all tabs
            galleryTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all content sections
            galleryContents.forEach(content => {
                content.style.display = 'none';
            });

            // Show target content
            const targetContent = document.getElementById(`${targetTab}-content`);
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        });
    });

    // ==========================================
    // CATEGORY FILTERING
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filterValue = this.dataset.filter;

            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    if (item.dataset.category === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // ==========================================
    // VIDEO INTERACTIONS
    // ==========================================
    const videoItems = document.querySelectorAll('.video-item');

    videoItems.forEach(item => {
        const playBtn = item.querySelector('.video-play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                const videoSrc = this.getAttribute('data-video') || this.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
                if (videoSrc) {
                    openVideoModal(videoSrc);
                }
            });
        }
    });

    // ==========================================
    // REEL INTERACTIONS
    // ==========================================
    const reelItems = document.querySelectorAll('.reel-item');

    reelItems.forEach(item => {
        item.addEventListener('click', function () {
            const reelTitle = this.querySelector('.reel-title h4').textContent;
            alert(`Playing Reel: ${reelTitle}\n\nYou can embed actual reel videos here using Instagram embeds or local video files.`);
            // In production, you would open a reel player modal here
        });
    });

    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe gallery items for animation
    document.querySelectorAll('.gallery-item, .video-item, .reel-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});

// ==========================================
// LIGHTBOX FUNCTIONALITY
// ==========================================

let currentImageIndex = 0;
const images = [
    {
        src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=1200&fit=crop',
        title: 'Treatment Center',
        description: 'State-of-the-art Ayurvedic facility'
    },
    {
        src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=1200&fit=crop',
        title: 'Panchakarma Therapy',
        description: 'Traditional healing process'
    },
    {
        src: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&h=1200&fit=crop',
        title: 'Natural Herbs',
        description: 'Organic medicinal plants'
    },
    {
        src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=1200&fit=crop',
        title: 'Meditation Space',
        description: 'Peaceful healing environment'
    },
    {
        src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&h=1200&fit=crop',
        title: 'Abhyanga Massage',
        description: 'Full body rejuvenation'
    },
    {
        src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=1200&fit=crop',
        title: 'Yoga Workshop',
        description: 'Community wellness event'
    }
];

function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function changeImage(direction) {
    currentImageIndex += direction;

    // Wrap around
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }

    updateLightboxImage();
}

function updateLightboxImage() {
    const image = images[currentImageIndex];
    document.getElementById('lightbox-image').src = image.src;
    document.getElementById('lightbox-title').textContent = image.title;
    document.getElementById('lightbox-description').textContent = image.description;
}

// Close lightbox on ESC key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (e.key === 'ArrowRight') {
        changeImage(1);
    }
});

// Close lightbox when clicking outside image
document.getElementById('lightbox')?.addEventListener('click', function (e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// ==========================================
// VIDEO MODAL FUNCTIONALITY
// ==========================================

function openVideoModal(videoSrc) {
    // Create modal if it doesn't exist
    let videoModal = document.getElementById('video-modal');
    if (!videoModal) {
        videoModal = document.createElement('div');
        videoModal.id = 'video-modal';
        videoModal.className = 'video-modal';
        videoModal.innerHTML = `
            <div class="video-modal-overlay"></div>
            <div class="video-modal-content">
                <button class="video-modal-close" onclick="closeVideoModal()">
                    <i class="bi bi-x-lg"></i>
                </button>
                <video id="modal-video" controls autoplay>
                    <source src="" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        `;
        document.body.appendChild(videoModal);
    }

    // Set video source and show modal
    const video = videoModal.querySelector('#modal-video');
    video.src = videoSrc;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Play video
    video.play().catch(err => console.log('Video autoplay prevented:', err));

    // Close on overlay click
    videoModal.querySelector('.video-modal-overlay').addEventListener('click', closeVideoModal);
}

function closeVideoModal() {
    const videoModal = document.getElementById('video-modal');
    if (videoModal) {
        const video = videoModal.querySelector('#modal-video');
        video.pause();
        video.src = '';
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close video modal on ESC key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeVideoModal();
    }
});

console.log('🖼️ Gallery page initialized');
