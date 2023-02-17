export default function GamepageGameTeam({ game }) {
  const gameTeam = JSON.parse(JSON.parse(game.custom_datapoints).gameTeam);

  return (
    <div id="cast" classname="tab cast">
      <div class="row">
        <h3 style={{color: "var(--primary-font-color)"}}>Credits for {game.title}</h3>
        {Object.entries(gameTeam).map(([key, value]) => {
          let multiple = false;
          if (typeof value == "object") {
            multiple = true;
          }
          return (
            <>
              <div class="title-hd-sm">
                <h4 style={{color: "var(--primary-font-color)"}}>{key}</h4>
              </div>
              {multiple ? (
                value.map((member, i) => {
                  return (
                      <div class="mvcast-item" key={i}>
                        <div class="cast-it">
                          <div class="cast-left">
                          {member}
                          </div>
                          <p>... {key} Team</p>
                        </div>
                      </div>
                  );
                })
              ) : (
                <div class="mvcast-item">
                  <div class="cast-it">
                    <div class="cast-left">
                    {value}
                    </div>
                    <p>... {key} Team</p>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
