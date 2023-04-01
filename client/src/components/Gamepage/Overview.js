import GameDetails from "./GameDetails";
import css from "./Overview.module.css";

export default function Overview({ game }) {
  return (
    <>
      <div className={css.summaryContainer}>
        {Object.entries(JSON.parse(game.summary)).map(([key, value]) => (
          <div key={key} className={css.summaryItem}>
            <h3 className={css.summaryKey}>{key}</h3>
            <p className={css.summaryValue}>{value}</p>
          </div>
        ))}
      </div>
      <GameDetails {...game} />
    </>
  );
}
