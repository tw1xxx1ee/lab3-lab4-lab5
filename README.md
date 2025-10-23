Отчёт по объединённой лабораторной работе №3-4-5: CSS-препроцессоры (LESS/SASS), CSS-библиотеки (Bootstrap/Tailwind) и JavaScript в веб-разработке с ИИ-ассистентами
Введение
В рамках курса "Основы веб-разработки с применением ИИ-ассистентов" (Приднестровский государственный университет им. Т.Г. Шевченко, Физико-технический институт, кафедра ИТ, разработчик Бричаг Д.В., 2025 г.) я объединил материал трёх лабораторных работ в один проект: лендинг "AI Assistant Pro". Это позволяет продемонстрировать интеграцию технологий:

Lab3: CSS-препроцессоры (SASS) — переменные, вложенность, миксины, импорты, компиляция в CSS.
Lab4: CSS-библиотеки (Tailwind CSS в utility-first подходе; Bootstrap опционально для сравнения).
Lab5 (JS-интеграция): JavaScript для динамики — анимации (fade-in, typewriter, carousel, particles), responsive меню, формы, темы (localStorage).

Проект — адаптивный (responsive) лендинг с тёмной темой по умолчанию, sticky/fixed navbar, длинной страницей (hero, about, features, advantages, testimonials, pricing, contact, blog, footer). Адаптивность: desktop (grid-cols-3/4), mobile (stack, hamburger-menu). Использовал ИИ (Grok) для генерации 70% кода (промпты: "Создай responsive лендинг на Tailwind с SASS темой", "Добавь JS анимации для carousel и fade-in").
Цели достижения:

Lab3: Компиляция SASS в CSS, использование переменных/миксинов для тем и стилей.
Lab4: Utility-first (Tailwind) для быстрой верстки, сравнение с компонентным Bootstrap.
JS: Динамика (анимации, toggle, smooth scroll), модульность (отдельные .js файлы).

Запуск:

sass --watch styles/style.scss:style.css

live-server .

Структура проекта
Проект организован модульно для удобства поддержки (разделение на partials, хотя в финале inline для простоты; в dev — fetch). Общий размер: ~5KB HTML + 2KB CSS (скомпилировано) + 3KB JS.

tailwind-landing/   (Tailwind + SASS + JS)
├── index.html      HTML-структура, Tailwind CDN, link style.css, scripts
├── style.css      CSS из SASS (миксины, переменные, keyframes)
├── styles/        (Lab3): препроцессинг
│   ├── style.scss # Главный: @use imports, body стили, .card/.button-primary
│   ├── _variables.scss # Переменные: $main-color (#22c55e green), --bg-color (dark default)
│   └── _mixins.scss    # Миксины: @mixin card-style (shadow, hover glow), button-primary (radius, darken)
├── theme-toggle.js # JS: Toggle темы (body.classList.toggle('dark'), localStorage)
├── animations.js   # JS: Fade-in (IntersectionObserver), typewriter, carousel, parallax, form submit
└── particles.js    # JS: Canvas particles для hero (50 зелёных точек, bounce)

index.html: Inline HTML для всех секций (hero с typewriter, grid responsive). Tailwind классы (e.g., md:grid-cols-3 для mobile/desktop).
SASS: Компиляция sass styles/style.scss style.css — генерит .card (вложенность), .button-primary (color.adjust для hover).
JS: Отдельные файлы для модульности (load() init). Responsive: media queries в SASS + Tailwind breakpoints.
Bootstrap-версия (опционально, в bootstrap-landing/): Аналог, с .navbar, .row, .card — для сравнения (компонентный подход).

Пример структуры в коде (фрагмент index.html для navbar, responsive):

<!-- Navbar: desktop flex, mobile hamburger -->
<nav class="bg-gray-800 fixed top-0 left-0 right-0 z-50">
    <div class="flex justify-between h-16">
        <h1 class="text-2xl text-green-400">AI Assistant Pro</h1>
        <!-- Desktop: hidden md:flex -->
        <div class="hidden md:flex space-x-8">
            <a href="#features" class="text-gray-300 hover:text-green-400">Функции</a>
            <!-- ... другие ссылки -->
        </div>
        <!-- Mobile: md:hidden, toggle JS -->
        <button id="mobile-toggle" class="md:hidden text-2xl">☰</button>
        <ul id="mobile-menu" class="absolute top-full w-full hidden bg-gray-800 mobile-open:block">
            <li><a href="#features" class="block p-4">Функции</a></li>
            <!-- ... -->
        </ul>
    </div>
</nav>

Использованные технологии и реализация
1. SASS (Lab3: препроцессоры)

Где использовал: В styles/ для тем, стилей карточек/кнопок. Компиляция в style.css — браузер видит обычный CSS.
Что применено: Переменные (стр. 4 Lab3), вложенность (стр. 5), миксины (стр. 6), @use (импорт, миграция от @import для Dart Sass v1.93), @media (адаптив, стр. 12), color.adjust (вместо darken, стр. 7).
Реализация: Тёмная тема по умолчанию (--bg-color: #111827). Миксин для glow-hover.
Пример кода (_mixins.scss):

@use 'variables' as var;
@use 'sass:color';

@mixin card-style {
  border-radius: 1rem;  // rounded-corners
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);  // Вложенность
  transition: all 0.3s;
  &:hover {  // Вложенность (Lab3 стр. 5)
    box-shadow: 0 10px 25px rgba(34,197,94,0.3);  // Green glow
    transform: translateY(-5px);
  }
}

@mixin button-primary {
  background: var(--main-color);  // CSS var из variables
  &:hover { background: color.adjust(var.$main-color, $lightness: -10%); }  // Операции (стр. 6-7)
}

В style.scss (применение):

@use 'mixins';
body .card { @include mixins.card-style; }  // Импорт и использование
@media (max-width: 600px) { .card { padding: 0.5rem; } }  // Адаптив


2. Tailwind CSS (Lab4: utility-first)

Где использовал: В index.html для layout (flex, grid, responsive). CDN для простоты (стр. 6 Lab4).
Что применено: Utility-классы (стр. 4): md:grid-cols-3 (responsive grid), hover:scale-110 (интерактив), bg-gradient-to-br (hero). Сравнение с Bootstrap: Tailwind — гибче (нет overrides), Bootstrap — компоненты (.card).
Реализация: Grid для cards (1-col mobile, 3-col desktop), flex для nav/footer. Интеграция с SASS: Миксины генерит .card, Tailwind добавляет padding (p-6).
Пример кода (features section):

<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">  <!-- Responsive grid (Lab4 стр. 8) -->
  <div class="card bg-gray-800 p-6 group hover:bg-green-900 transition-all">  <!-- SASS .card + Tailwind utilities -->
    <img src="..." class="w-16 h-16 rounded-full object-cover" loading="lazy">  <!-- Lazy-load -->
    <h4 class="text-xl mb-2">Анализ данных</h4>
    <p class="text-gray-400">...</p>
  </div>
</div>

3. JavaScript (анимации и динамика)

Где использовал: В .js файлах для интерактива (меню, темы, анимации). Inline в index.html для init.
Что применено: IntersectionObserver (fade-in), setTimeout (typewriter/carousel), localStorage (темы), addEventListener (toggle/form). Particles на canvas (low-perf).
Реализация: Модульно (отдельные функции). Responsive: JS для mobile-menu toggle. Интеграция: JS читает SASS vars (body.dark).
Пример кода (animations.js — fade-in и mobile toggle):

// Fade-in on scroll (IntersectionObserver)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');  // SASS animation trigger
    }
  });
});
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Mobile menu toggle
document.getElementById('mobile-toggle').addEventListener('click', () => {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');  // Tailwind hidden
  menu.classList.toggle('mobile-open');  // Custom class for slide (transition-transform)
});

// Typewriter (setTimeout)
function initTypewriter() {
  const text = "Ваш умный ИИ-помощник";
  const el = document.getElementById('typewriter');
  el.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100);  // 100ms delay
    }
  }
  type();
}

// Carousel (setInterval)
function initCarousel() {
  const slides = document.querySelectorAll('.slide');
  let current = 0;
  setInterval(() => {
    slides.forEach(slide => slide.classList.add('opacity-0'));
    current = (current + 1) % slides.length;
    slides[current].classList.remove('opacity-0');  // Tailwind opacity
  }, 3000);
}

// Form submit (addEventListener)
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('Сообщение отправлено! (Demo)');
});

Результаты и анализ

Что сделано: Полноценный лендинг (8+ секций, 2000px скролл), responsive (Tailwind breakpoints + SASS @media), тёмная тема (SASS vars + JS toggle), анимации (JS Observer/setTimeout), изображения (Unsplash/Freepik с fallback), фиксированный nav (JS toggle для mobile).
Интеграция 3 в 1: SASS генерит базовые стили (.card с миксинами), Tailwind — layout (grid/flex), JS — динамику (анимации/меню). Bootstrap-версия в отдельной папке для сравнения (компоненты .navbar/.card).
Сложности/решения: CORS для fetch (фикс — inline HTML). SASS deprecation (@import → @use). Изображения (broken) — fallback + надёжные CDN.

