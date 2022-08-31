export default function GamepageGameCard({ game }) {
  return (
    <div class="movie-img sticky-sb">
      <img src={game.image_url}
            alt={`${game.title} cover art`} />
      {/* <div class="movie-btn">
        <div class="btn-transform transform-vertical red">
          <div>
            <a href="#" class="item item-1 redbtn">
              {" "}
              <i class="ion-play"></i> Watch Trailer
            </a>
          </div>
          <div>
            <a
              href="https://www.youtube.com/embed/o-0hcF97wy0"
              class="item item-2 redbtn fancybox-media hvr-grow"
            >
              <i class="ion-play"></i>
            </a>
          </div>
        </div>
        <div class="btn-transform transform-vertical">
          <div>
            <a href="#" class="item item-1 yellowbtn">
              {" "}
              <i class="ion-card"></i> Buy ticket
            </a>
          </div>
          <div>
            <a href="#" class="item item-2 yellowbtn">
              <i class="ion-card"></i>
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
}
