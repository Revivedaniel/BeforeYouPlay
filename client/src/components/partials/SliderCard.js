export default function SliderCard({ game }) {
  return (
    <div class="movie-item">
      <div class="mv-img">
        <a href="#">
          <img
            src="images/uploads/slider1.jpg"
            alt=""
            width="285"
            height="437"
          />
        </a>
      </div>
      <div class="title-in">
        <div class="cate">
          <span class="blue">
            <a href="#">Sci-fi</a>
          </span>
        </div>
        <h6>
          <a href="#">Interstellar</a>
        </h6>
        <p>
          <i class="ion-android-star"></i>
          <span>7.4</span> /10
        </p>
      </div>
    </div>
  );
}
