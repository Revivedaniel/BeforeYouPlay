export default function SliderCard({ game, setGameTitle }) {
  const handleGameSelect = (e) => {
    e.preventDefault();
    setGameTitle(game.title);
    window.location.href = `/games/${game.slug}`;
  }
  return (
    <a href="/" onClick={handleGameSelect}>
      <div
        className="movie-item"
        // style={{ minWidth: "285px", height: "437px", cursor: "pointer", margin: "0" }}
        style={{ minWidth: "285px", cursor: "pointer", margin: "0" }}
      >
        <div className="mv-img">
          <img
            src={game.image_url}
            alt={`${game.title} cover art`}
            width="285"
            height="437"
            // style={{ width: "285px", height: "437px" }}
            style={{ width: "285px" }}
          />
        </div>
        <div className="title-in">
          <div
            className="cate"
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "137%",
            }}
          >
            {JSON.parse(game.genres).map((genre, i) => {
              // if(i === 3) {
              //   return;
              // }
              let color;
              switch (i) {
                case 0:
                  color = "blue";
                  break;
                case 1:
                  color = "yell";
                  break;
                case 2:
                  color = "orange";
                  break;
                case 3:
                  color = "green";
                  break;
                default:
                  break;
              }
              return (
                <span className={color || "blue"} key={i}>
                  <p>{genre}</p>
                </span>
              );
            })}
          </div>
          <h6>
            <p
              style={{
                fontSize: "18px",
                fontFamily: "'Dosis', sans-serif",
                color: "#ffffff",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {game.title}
            </p>
          </h6>
          {/* <p>
            <i className="ion-android-star"></i>
            <span>7.4</span> /10
          </p> */}
        </div>
      </div>
    </a>
  );
}
