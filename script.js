document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.querySelector('.slides');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const toggleButton = document.getElementById('toggleSlideshow');
    const slideshowContainer = document.querySelector('.slideshow-container');
    let currentSlide = 0;
    let isSlideshowVisible = false;

    // Toggle slideshow visibility on double click
    toggleButton.addEventListener('dblclick', () => {
        isSlideshowVisible = !isSlideshowVisible;
        slideshowContainer.classList.toggle('hidden');
        toggleButton.classList.toggle('active');
        toggleButton.textContent = isSlideshowVisible ? 'Double Click to Hide Slideshow' : 'Double Click to Show Slideshow';
        
        if (isSlideshowVisible && galleryItems.length > 0) {
            showSlide(currentSlide);
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
            if (!isSlideshowVisible) {
                toggleButton.click();
                toggleButton.click(); // Simulate double click
            }
            currentSlide = index;
            showSlide(currentSlide);
            
            // Scroll to slideshow
            slideshowContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!isSlideshowVisible) return;
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });
});