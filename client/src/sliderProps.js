import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
  FreeMode
} from "swiper";
SwiperCore.use([Pagination, Navigation, Autoplay, EffectFade]);

export const homepageProps = {
  slidesPerView: "auto",
  spaceBetween: 30,
  freeMode: true,
  loop: true,
  modules: [FreeMode],
  breakpoints: {
    // when window width is >= 320px
    320: {
      freeMode: false,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      freeMode: true,
      spaceBetween: 30
    },
    // when window width is >= 640px
    640: {
      spaceBetween: 40
    }
  }
};
