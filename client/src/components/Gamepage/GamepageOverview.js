import gameRating from "../../utils/gameRating";

export default function Gamepageoverview({ game, customDataPoints }) {
  console.log(customDataPoints)
  const handleDefault = (e) => {
    e.preventDefault();
  };
  return (
    <div id="overview" className="tab active">
      <div className="row">
        <div className="col-md-8 col-sm-12 col-xs-12">
          <div className="title-hd-sm" style={{marginTop: "0"}}>
            <h4>Summary</h4>
          </div>
          <p>{game.summary}</p>
          {/* <div className="title-hd-sm">
            <h4>cast</h4>
            <a href="#" className="time">
            Full Cast & Crew <i className="ion-ios-arrow-right"></i>
            </a>
            </div>
            <div className="mvcast-item">
            <div className="cast-it">
            <div className="cast-left">
            <img src="images/uploads/cast1.jpg" alt="" />
            <a href="#">Robert Downey Jr.</a>
            </div>
            <p>... Robert Downey Jr.</p>
            </div>
            <div className="cast-it">
            <div className="cast-left">
            <img src="images/uploads/cast2.jpg" alt="" />
            <a href="#">Chris Hemsworth</a>
            </div>
            <p>... Thor</p>
            </div>
            <div className="cast-it">
            <div className="cast-left">
            <img src="images/uploads/cast3.jpg" alt="" />
            <a href="#">Mark Ruffalo</a>
            </div>
            <p>... Bruce Banner/ Hulk</p>
            </div>
            <div className="cast-it">
            <div className="cast-left">
            <img src="images/uploads/cast4.jpg" alt="" />
            <a href="#">Chris Evans</a>
            </div>
            <p>... Steve Rogers/ Captain America</p>
            </div>
            <div className="cast-it">
            <div className="cast-left">
            <img src="images/uploads/cast5.jpg" alt="" />
            <a href="#">Scarlett Johansson</a>
            </div>
            <p>... Natasha Romanoff/ Black Widow</p>
            </div>
            <div className="cast-it">
            <div className="cast-left">
            <img src="images/uploads/cast6.jpg" alt="" />
            <a href="#">Jeremy Renner</a>
            </div>
            <p>... Clint Barton/ Hawkeye</p>
            </div>
            <div className="cast-it">
            <div className="cast-left">
                <img src="images/uploads/cast7.jpg" alt="" />
                <a href="#">James Spader</a>
                </div>
                <p>... Ultron</p>
                </div>
                <div className="cast-it">
                <div className="cast-left">
                <img src="images/uploads/cast9.jpg" alt="" />
                <a href="#">Don Cheadle</a>
                </div>
                <p>... James Rhodes/ War Machine</p>
            </div>
          </div> */}
          <div className="title-hd-sm">
            <h4>Gameplay Overview</h4>
          </div>
          { customDataPoints ? <div className="mv-user-review-item">
            <p>{customDataPoints.gameplayOverview}</p>
          </div> : null}
          <div className="title-hd-sm">
            <h4>Related Games</h4>
          </div>
          <div className="mvsingle-item ov-item">
            { customDataPoints ? 
            customDataPoints.relatedGames.map((relatedGame, i) => {
              console.log(game)
              return (
                <a
                  key={i}
                  className="img-lightbox"
                  data-fancybox-group="gallery"
                  href={relatedGame?.slug ? `/game/${relatedGame.slug}` : `/search/${relatedGame}`}
                  style={{ marginBottom: "5%", display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <h4>
                    {relatedGame?.title ? relatedGame.title : relatedGame}
                  </h4>
                  {
                    RegExp(/^https.+/gm).test(relatedGame.image) ? <img src={relatedGame.image} alt={relatedGame.title} style={{width: "100px"}}/> : <div style={{width: "100px", height: "100px"}}></div>
                  }

                </a>
              );
            }) : null}
            <div className="vd-it">
              <img className="vd-img" src="images/uploads/image4.jpg" alt="" />
              <a
                className="fancybox-media hvr-grow"
                href="https://www.youtube.com/embed/o-0hcF97wy0"
              >
                <img src="images/uploads/play-vd.png" alt="" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-xs-12 col-sm-12">
          {/* <div className="sb-it">
            <h6>Director: </h6>
            <p>
            <a href="#">Joss Whedon</a>
            </p>
            </div>
            <div className="sb-it">
            <h6>Writer: </h6>
            <p>
            <a href="#">Joss Whedon,</a> <a href="#">Stan Lee</a>
            </p>
            </div>
            <div className="sb-it">
            <h6>Stars: </h6>
            <p>
            <a href="#">Robert Downey Jr,</a> <a href="#">Chris Evans,</a>{" "}
            <a href="#">Mark Ruffalo,</a>
            <a href="#"> Scarlett Johansson</a>
            </p>
          </div> */}
          <div className="sb-it">
            <h6>Genres:</h6>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              {JSON.parse(game.genres).map((genre, i) => {
                return (
                  <a href="/" key={i} onClick={handleDefault}>
                    {genre}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="sb-it">
            <h6>Release Date:</h6>
            <p>{game.release_year}</p>
          </div>
          {/* <div className="sb-it">
            <h6>Run Time:</h6>
            <p>141 min</p>
          </div> */}
          <div className="sb-it">
            <h6>Age Rating:</h6>
            <p>{gameRating(game.age_rating)}</p>
          </div>
          <div className="sb-it">
            <h6>Themes:</h6>
            {customDataPoints ? (
              <p className="tags">
                {customDataPoints.themes.map((theme, i) => {
                  return (
                    <span className="time" key={i}>
                      <a href="/" onClick={handleDefault}>
                        {theme}
                      </a>
                    </span>
                  );
                })}
              </p>
            ) : null}
          </div>
          <div className="ads">
            <img src="images/uploads/ads1.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
