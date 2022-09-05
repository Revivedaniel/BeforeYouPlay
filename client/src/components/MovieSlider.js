import SliderCard from "./partials/SliderCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { homepageProps } from "../sliderProps";

// Import Swiper styles
import "swiper/swiper-bundle.css";

export default function MovieSlider({ games, setGameTitle }) {
  return (
    <div className="slider movie-items">
      <div className="container">
        <div className="row">
          {/* <div className="social-link">
            <p>Follow us: </p>
            <a href="#">
              <i className="ion-social-facebook"></i>
            </a>
            <a href="#">
              <i className="ion-social-twitter"></i>
            </a>
            <a href="#">
              <i className="ion-social-googleplus"></i>
            </a>
            <a href="#">
              <i className="ion-social-youtube"></i>
            </a>
          </div> */}
          {/* <div className="slick-multiItemSlider" style={{ display: "flex" }}>
            {games.map((game, i) => {
              if (i < 4) {
                return <SliderCard game={game} setGameTitle={setGameTitle} key={game._id} />;
              }
              return null;
            })}
          </div> */}
          <Swiper
          { ...homepageProps }
            className="mySwiper"
          >
            {games.map((game, i) => {
              if (i < 10) {
                return (
                <SwiperSlide style={{width: "fit-content"}}>
                  <SliderCard
                    game={game}
                    setGameTitle={setGameTitle}
                    key={game._id}
                  />
                </SwiperSlide>);
              }
              return null;
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
