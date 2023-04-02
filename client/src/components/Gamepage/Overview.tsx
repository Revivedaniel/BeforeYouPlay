import { Game } from "./Game.model";
import GameDetails from "./GameDetails";
import css from "./Overview.module.css";

interface OverviewProps {
  game: Game;
}

export default function Overview({ game }: OverviewProps) {
  return (
    <>
      <div className={css.summaryContainer}>
        {Object.entries(JSON.parse(game.summary) as object).map(([key, value]) => (
          <div key={key} className={css.summaryItem}>
            <h3 className={css.summaryKey}>{key}</h3>
            <p className={css.summaryValue}>{value}</p>
          </div>
        ))}
      </div>
      <GameDetails
        platforms={game.platforms}
        ageRatings={game.ageRatings}
        releaseDates={game.releaseDates}
        developers={game.developers}
        publishers={game.publishers}
        genres={game.genres}
        gameModes={game.gameModes}
        series={game.series as string}
      />
    </>
  );
}
