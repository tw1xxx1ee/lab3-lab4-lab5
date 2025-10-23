// Fade-in on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
});
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Typewriter hero
function initTypewriter() {
  const text = "Ваш умный ИИ-помощник";
  const el = document.getElementById('typewriter');
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  }
  type();
}

// Carousel testimonials
function initCarousel() {
  const slides = document.querySelectorAll('.slide');
  let current = 0;
  setInterval(() => {
    slides[current].style.opacity = '0';
    current = (current + 1) % slides.length;
    slides[current].style.opacity = '1';
  }, 3000);
}

// Form submit
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('Сообщение отправлено! (Demo)');
});

// Parallax
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  document.querySelector('.parallax').style.transform = `translateY(${scrolled * 0.5}px)`;
});