import { Link } from "react-router-dom";

export default function SmallSliderCard({ game }) {
  return (
    <div
      className="slide-it"
      style={{ width: "162px", margin: "0 1% 2%", height: "216px" }}
    >
      <div className="movie-item" style={{ width: "162px", height: "216px" }}>
        <Link
          to={{
            pathname: `/games/${game.slug}`,
          }}
        >
          <div className="mv-img">
            <img
              src={game.image_url}
              alt={`${game.title} cover art`}
              width="162"
              height="216"
            />
          </div>
          <div className="hvr-inner">
            <p>
              {" "}
              Read more <i className="ion-android-arrow-dropright"></i>{" "}
            </p>
          </div>
        </Link>
        <div className="title-in">
          <h6>
            <p>{game.title}</p>
          </h6>
          {/* <p>
            <i className="ion-android-star"></i>
            <span>7.4</span> /10
          </p> */}
        </div>
      </div>
    </div>
  );
}
