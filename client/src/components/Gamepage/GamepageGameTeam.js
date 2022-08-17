export default function GamepageGameTeam({ game }) {
  const gameTeam = JSON.parse(game.custom_datapoints).gameTeam;

  return (
    <div id="cast" classname="tab cast">
      <div class="row">
        <h3>Credits for</h3>
        <h2>{game.title}</h2>
        {Object.entries(gameTeam).map(([key, value]) => {
          let multiple = false;
          if (typeof value == "object") {
            multiple = true;
          }
          return (
            <>
              <div class="title-hd-sm">
                <h4>{key}</h4>
              </div>
              {multiple ? (
                value.map((member, i) => {
                  console.log(member);
                  return (
                    <>
                      <div class="mvcast-item">
                        <div class="cast-it">
                          <div class="cast-left">
                            <a href="/">{member}</a>
                          </div>
                          <p>... {key} Team</p>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div class="mvcast-item">
                  <div class="cast-it">
                    <div class="cast-left">
                      <a href="/">{value}</a>
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
