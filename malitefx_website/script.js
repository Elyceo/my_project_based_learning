
const text = "Let MaliteFx";
const typedTextSpan = document.querySelector("#typed-text");
const cursorSpan = document.querySelector("#cursor");

let textIndex = 0;
let isTyping = true;

function typeText() {
    if (isTyping) {
        if (textIndex < text.length) {
            typedTextSpan.textContent += text.charAt(textIndex);
            textIndex++;
            setTimeout(typeText, 200);
        } else {
            isTyping = false;
            setTimeout(backspaceText, 1000);
        }
    }
}

function backspaceText() {
    if (!isTyping) {
        if (textIndex > 0) {
            typedTextSpan.textContent = text.substring(0, textIndex - 1);
            textIndex--;
            setTimeout(backspaceText, 100);
        } else {
            isTyping = true;
            setTimeout(typeText, 500);
        }
    }
}

// Start the typing effect
typeText();

function toggleMenu() {
    var navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

// CSV content as a string
const csvContent = `
"Lorem ipsum dolor sit amet, consectetur adipiscing elit.","John Doe"
"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","Jane Smith"
"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.","Bob Johnson"
"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","Alice Brown"
"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.","Eva Green"
`.trim();

// Function to parse CSV string

function parseCSV(csv) {
    const lines = csv.split('\n');
    return lines.map(line => {
        const [text, author] = line.split('","').map(item => item.replace(/^"|"$/g, ''));
        return { text, author };
    });
}

// Function to create testimonial HTML
function createTestimonialHTML(testimonial) {
    return `
        <div class="testimonial">
            <div class="testimonial-image"></div>
            <div class="testimonial-content">
                <p class="testimonial-text">"${testimonial.text}"</p>
                <p class="testimonial-author">${testimonial.author}</p>
            </div>
        </div>
    `;
}

// Function to load testimonials from CSV string and initialize the slider
function loadTestimonials() {
    const testimonials = parseCSV(csvContent);
    const container = document.getElementById('testimonials-container');

    // Double the testimonials to ensure smooth looping
    const doubledTestimonials = [...testimonials, ...testimonials];

    doubledTestimonials.forEach(testimonial => {
        container.innerHTML += createTestimonialHTML(testimonial);
    });

    initializeTestimonialSlider();
}

// Function to initialize and run the testimonial slider
function initializeTestimonialSlider() {
    const container = document.getElementById('testimonials-container');
    const window = document.getElementById('testimonials-window');
    const testimonials = container.children;
    const testimonialHeight = testimonials[0].offsetHeight + 20; // Height + margin
    let currentIndex = 0;
    let isHovered = false;

function slideTestimonials() {
    if (!isHovered) {
        currentIndex = (currentIndex + 2) % testimonials.length;
        container.style.transform = `translateY(-${currentIndex * testimonialHeight}px)`;

        // Reset to the start when we reach the end of the doubled list
        if (currentIndex >= testimonials.length / 2) {
            setTimeout(() => {
                container.style.transition = 'none';
                currentIndex = 0;
                container.style.transform = `translateY(0)`;
                setTimeout(() => {
                    container.style.transition = 'transform 5s linear';
                }, 50);
            }, 5000); // Wait for the transition to complete
        }
    }
}

    window.addEventListener('mouseenter', () => {
        isHovered = true;
    });

    window.addEventListener('mouseleave', () => {
        isHovered = false;
    });

    setInterval(slideTestimonials, 5000); // Change every 5 seconds
}

// Load testimonials when the page is loaded
window.addEventListener('load', loadTestimonials);

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.mynavbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Floating join community button
window.addEventListener('scroll', function() {
    var button = document.getElementById('communityButton');
    var heroHeight = document.querySelector('.hero-section').offsetHeight;
    
    if (window.scrollY > heroHeight) {
        button.style.display = 'block';
    } else {
        button.style.display = 'none';
    }
});