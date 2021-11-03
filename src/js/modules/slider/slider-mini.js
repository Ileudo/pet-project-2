import Slider from './slider';

export default class MiniSlider extends Slider {
  constructor(container, next, prev, activeClass, animate, autoplay) {
    super(container, next, prev, activeClass, animate, autoplay);
  }

  decorateSlides() {
    this.slides.forEach((slide) => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector('.card__title').style.opacity = '0.4';
        slide.querySelector('.card__controls-arrow').style.opacity = '0';
      }
    });

    if (!this.slides[0].tagName === 'BUTTON') {
      this.slides[0].classList.add(this.activeClass);
    }

    if (this.animate) {
      this.slides[0].querySelector('.card__title').style.opacity = '1';
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
    }
  }

  nextSlide() {
    if (this.slides[1].tagName === 'BUTTON' && this.slides[2].tagName === 'BUTTON') {
      this.container.append(this.slides[0]); //slide
      this.container.append(this.slides[1]); // button
      this.container.append(this.slides[2]); // button
      this.decorateSlides();
    } else if (this.slides[1].tagName === 'BUTTON') {
      this.container.append(this.slides[0]); //slide
      this.container.append(this.slides[1]); // button
      this.decorateSlides();
    }
    this.container.append(this.slides[0]);
    this.decorateSlides();
  }

  bindTriggers() {
    this.next.addEventListener('click', this.nextSlide.bind(this));

    this.prev.addEventListener('click', () => {
      for (let i = this.slides.length - 1; i > 0; i--) {
        if (this.slides[i].tagName !== 'BUTTON') {
          const lastSlide = this.slides[i];
          this.container.prepend(lastSlide);
          this.decorateSlides();
          break;
        }
      }
    });
  }

  autoPlay(timeIntervel) {
    let move;
    if (this.autoplay) {
      move = setInterval(this.nextSlide.bind(this), timeIntervel);
    }

    [this.container, this.next, this.prev].forEach((elem) =>
      elem.addEventListener('mouseenter', () => {
        clearInterval(move);
      })
    );

    [this.container, this.next, this.prev].forEach((elem) =>
      elem.addEventListener('mouseleave', () => {
        move = setInterval(this.nextSlide.bind(this), timeIntervel);
      })
    );
  }

  init() {
    try {
      this.container.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        `;

      this.bindTriggers();
      this.decorateSlides();
      this.autoPlay(1000);
    } catch (e) {}
  }
}
