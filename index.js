// Ждем загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".custom-slider");
  if (!slider) return;

  const track = slider.querySelector(".slider-track");
  const slides = slider.querySelectorAll(".slide");
  const prevBtn = slider.querySelector(".prev-btn");
  const nextBtn = slider.querySelector(".next-btn");
  const dotsContainer = slider.querySelector(".slider-dots");

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Создаем точки
  function createDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  // Обновляем активную точку
  function updateDots() {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Перемещаемся к слайду
  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;

    currentIndex = index;
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
    updateDots();
  }

  // Следующий слайд
  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1);
    } else {
      // Если последний - возвращаемся к первому
      goToSlide(0);
    }
  }

  // Предыдущий слайд
  function prevSlide() {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      // Если первый - идем к последнему
      goToSlide(totalSlides - 1);
    }
  }

  // Добавляем обработчики на кнопки
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Автопрокрутка (опционально, каждые 4 секунды)
  let autoplayInterval = setInterval(nextSlide, 4000);

  // Останавливаем автопрокрутку при наведении мыши
  slider.addEventListener("mouseenter", () => {
    clearInterval(autoplayInterval);
  });

  // Возобновляем автопрокрутку когда мышь ушла
  slider.addEventListener("mouseleave", () => {
    autoplayInterval = setInterval(nextSlide, 4000);
  });

  // Создаем точки и запускаем слайдер
  createDots();

  // Добавляем клавиатурную навигацию
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  });
});
