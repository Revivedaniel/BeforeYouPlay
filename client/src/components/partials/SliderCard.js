export default function SliderCard({ game }) {
  return (
    <div className="movie-item" style={{minWidth: "285px", height: "437px"}}>
      <div className="mv-img">
        <a href="#">
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover_id}.jpg`}
            alt={`${game.title} cover art`}
            width="285"
            height="437"
            style={{ width: "285px", height: "437px" }}
          />
        </a>
      </div>
      <div className="title-in">
        <div className="cate">
          <span className="blue">
            <a href="#">Sci-fi</a>
          </span>
        </div>
        <h6>
          <a href="#">{game.title}</a>
        </h6>
        <p>
          <i className="ion-android-star"></i>
          <span>7.4</span> /10
        </p>
      </div>
    </div>
  );
}
