export default function SmallSliderCard({ game }) {
  return (
    <div
      className="slide-it"
      style={{ width: "162px", margin: "0 1% 2%", height: "216px" }}
    >
      <div className="movie-item" style={{width: "162px", height: "216px"}}>
        <div className="mv-img">
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover_id}.jpg`}
            alt={`${game.title} cover art`}
            width="162"
            height="216"
          />
        </div>
        <div className="hvr-inner">
          <a href={`/games/${game.slug}`}>
            {" "}
            Read more <i className="ion-android-arrow-dropright"></i>{" "}
          </a>
        </div>
        <div className="title-in">
          <h6>
            <a href="#">{game.title}</a>
          </h6>
          <p>
            <i className="ion-android-star"></i>
            <span>7.4</span> /10
          </p>
        </div>
      </div>
    </div>
  );
}
