document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.querySelector('.slides');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const toggleButton = document.getElementById('toggleSlideshow');
    const slideshowContainer = document.querySelector('.slideshow-container');
    const closeButton = document.querySelector('.close-btn');
    let currentSlide = 0;
    let isSlideshowVisible = false;

    // Function to hide slideshow
    function hideSlideshow() {
        isSlideshowVisible = false;
        slideshowContainer.classList.add('hidden');
        toggleButton.classList.remove('active');
        toggleButton.textContent = 'Double Click to Show Slideshow';
    }

    // Function to show slideshow
    function showSlideshow() {
        isSlideshowVisible = true;
        slideshowContainer.classList.remove('hidden');
        toggleButton.classList.add('active');
        toggleButton.textContent = 'Double Click to Hide Slideshow';
        if (galleryItems.length > 0) {
            showSlide(currentSlide);
        }
    }

    // Close button click handler
    closeButton.addEventListener('click', hideSlideshow);

    // Toggle slideshow visibility on double click
    toggleButton.addEventListener('dblclick', () => {
        if (isSlideshowVisible) {
            hideSlideshow();
        } else {
            showSlideshow();
        }
    });

    // Function to show the current slide
    function showSlide(index) {
        const item = galleryItems[index];
        const isVideo = item.querySelector('video');
        
        slidesContainer.innerHTML = '';
        if (isVideo) {
            const video = item.querySelector('video').cloneNode(true);
            video.play();
            slidesContainer.appendChild(video);
        } else {
            const img = item.querySelector('img').cloneNode(true);
            slidesContainer.appendChild(img);
        }
    }

    // Show first slide on load
    if (galleryItems.length > 0) {
        showSlide(0);
    }

    // Previous slide button
    prevButton.addEventListener('click', () => {
        if (!isSlideshowVisible) return;
        currentSlide = (currentSlide - 1 + galleryItems.length) % galleryItems.length;
        showSlide(currentSlide);
    });

    // Next slide button
    nextButton.addEventListener('click', () => {
        if (!isSlideshowVisible) return;
        currentSlide = (currentSlide + 1) % galleryItems.length;
        showSlide(currentSlide);
    });

    // Click on gallery items to show in slideshow
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            showSlideshow();
            
            // Scroll to slideshow
            slideshowContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Keyboard navigation and close with Escape key
    document.addEventListener('keydown', (e) => {
        if (!isSlideshowVisible) return;
        
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        } else if (e.key === 'Escape') {
            hideSlideshow();
        }
    });
});