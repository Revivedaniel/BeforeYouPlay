import { useState } from "react";

export default function RateData({ setRateData }) {
  const [rating, setRating] = useState(null);
  const [info, setInfo] = useState(false);

  const handleUp = (e) => {
    e.preventDefault();
    setRating(1);
  };
  const handleDown = (e) => {
    e.preventDefault();
    setRating(-1);
  };
  const handleEnter = (e) => {
    e.preventDefault();
    setInfo(true);
  };
  const handleLeave = (e) => {
    e.preventDefault();
    setInfo(false);
  };

  return (
    <div
      className="overlay openform"
      id="overlayBorder"
      onClick={(e) => {
        e.preventDefault();
        if (e.target.id === "overlayBorder") {
          setRateData(false);
        }
      }}
    >
      <div className="login-wrapper" id="login-content">
        <a
          href="/"
          onClick={function (e) {
            e.preventDefault();
            setRateData(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-x-square-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
          </svg>
        </a>
        <div className="login-content">
          <h3>
            Rate a datapoint{" "}
            <a href="/" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
              {info ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-info-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-info-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              )}
            </a>
          </h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <label htmlFor="username">
                Datapoint:
                <select name="pets" id="pet-select">
                  <option value="">--Please choose an option--</option>
                  <option value="game title">Game Title</option>
                  <option value="sum">Summary</option>
                  <option value="cover">Game Image</option>
                  <option value="release">Release Date</option>
                  <option value="gen">Genres</option>
                  <option value="ages">Age Ratings</option>
                  <option value="dev">Developer</option>
                  <option value="dir">Directors</option>
                  <option value="prod">Producers</option>
                  <option value="des">Designers</option>
                  <option value="prog">Programmers</option>
                  <option value="art">Artists</option>
                  <option value="comp">Composers</option>
                  <option value="pub">Publisher</option>
                  <option value="gameM">Game Modes</option>
                  <option value="beat">How Long To Beat</option>
                  <option value="them">Themes</option>
                  <option value="gameP">Gameplay Overview</option>
                  <option value="rel">Related Games</option>
                </select>
              </label>
            </div>

            <div className="row">
              <div
                className="rating"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexDirection: "row",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <label style={{ margin: "0" }}>UpVote</label>
                  <a
                    href="/"
                    onClick={handleUp}
                    style={{ alignSelf: "center" }}
                  >
                    {rating === 1 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="currentColor"
                        class="bi bi-arrow-up-square-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="currentColor"
                        class="bi bi-arrow-up-square"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
                        />
                      </svg>
                    )}
                  </a>
                </span>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <label style={{ margin: "0" }}>DownVote</label>
                  <a
                    href="/"
                    onClick={handleDown}
                    style={{ alignSelf: "center" }}
                  >
                    {rating === -1 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="currentColor"
                        class="bi bi-arrow-down-square-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="currentColor"
                        class="bi bi-arrow-down-square"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
                        />
                      </svg>
                    )}
                  </a>
                </span>
              </div>
            </div>
            <div className="row" style={{ marginTop: "20px" }}>
              <button type="submit" aria-disabled={false}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {info ? (
        <div
          style={{
            width: "430px",
            height: "381px",
            backgroundColor: "black",
            position: "fixed",
            top: "278px",
            right: "257px",
            padding: "50px",
          }}
        >
          <h5>What is this?</h5>
          <p>
            Before You Play uses AI to generate data about video games.
            Sometimes this data is innacurate and does not represent the game
            very well. To help keep data relevant and accurate, we have a
            Datapoint Rating System.
          </p>
          <h5>How does it work?</h5>
          <p>
            Signed in Users will see this icon{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-wrench-adjustable-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6.705 8.139a.25.25 0 0 0-.288-.376l-1.5.5.159.474.808-.27-.595.894a.25.25 0 0 0 .287.376l.808-.27-.595.894a.25.25 0 0 0 .287.376l1.5-.5-.159-.474-.808.27.596-.894a.25.25 0 0 0-.288-.376l-.808.27.596-.894Z" />
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm-6.202-4.751 1.988-1.657a4.5 4.5 0 0 1 7.537-4.623L7.497 6.5l1 2.5 1.333 3.11c-.56.251-1.18.39-1.833.39a4.49 4.49 0 0 1-1.592-.29L4.747 14.2a7.031 7.031 0 0 1-2.949-2.951ZM12.496 8a4.491 4.491 0 0 1-1.703 3.526L9.497 8.5l2.959-1.11c.027.2.04.403.04.61Z" />
            </svg>{" "}
            on newely generated games. When clicked, you will choose the
            datapoint you want to rate from the drop down. Then, choose to
            either UPVOTE or DOWNVOTE the datapoint and submit.
          </p>
        </div>
      ) : null}
    </div>
  );
}
