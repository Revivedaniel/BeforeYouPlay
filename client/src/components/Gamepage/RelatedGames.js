export default function RelatedGames({ game, customDataPoints }) {
  return (
    <div id="moviesrelated" classname="tab">
      <div class="row">
        <h3>Related Games To</h3>
        <h2>{game.title}</h2>
        <div class="topbar-filter">
          <p>Found {customDataPoints.relatedGames.length} games in total</p>
        </div>
        {customDataPoints.relatedGames.map((relatedGame) => {
          return (
            <div class="movie-item-style-2">
                <a
                  className="img-lightbox"
                  href={relatedGame?.slug ? `/games/${relatedGame.slug}` : `/search/${relatedGame}`}
                  style={{ marginBottom: "5%", display: "flex", flexDirection: "column", alignItems: "center" }}
                  >
                {
                  RegExp(/^https.+/gm).test(relatedGame.image) ? <img src={relatedGame.image} alt={relatedGame.title} style={{width: "100px"}}/> : <div style={{width: "100px", height: "100px", marginRight: "30px"}}></div>
                }
                </a>
              <div class="mv-item-infor">
                <h6>
                  <a href={relatedGame?.slug ? `/games/${relatedGame.slug}` : `/search/${relatedGame}`}>
                  {relatedGame?.title ? relatedGame.title : relatedGame}
                  </a>
                </h6>   
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
