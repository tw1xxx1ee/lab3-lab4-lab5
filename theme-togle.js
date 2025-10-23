// Theme: Dark default, save choice
const toggle = document.getElementById('theme-toggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme') || 'dark';
body.classList.add(currentTheme);
toggle.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';

toggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  body.classList.toggle('light', !isDark);
  toggle.innerHTML = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});