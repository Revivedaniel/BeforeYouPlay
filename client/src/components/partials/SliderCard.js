export default function SliderCard({ game }) {
  return (
    <div className="movie-item" style={{minWidth: "285px", height: "437px", cursor: "pointer"}}>
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
        <div className="cate" style={{display: "flex", flexWrap: "wrap", flexDirection: "column", alignItems: "flex-start", width: "137%"}}>
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
            return <span className={color || "blue"} key={i} >
            <a href="#">{genre}</a>
          </span>
          })}
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
