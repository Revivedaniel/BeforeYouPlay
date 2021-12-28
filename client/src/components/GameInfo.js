

export function GameInfo({ game }) {
  
  return (
    <>
      <div>
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover_id}.jpg`}
          alt={`${game.title} cover art`}
        />
        <div>
          <div>
            <span>{game.title}</span>
            <span>{game.release_year}</span>
          </div>
          <div>
            <span>Playtime</span>
            <span>
              {JSON.parse(game.genres).map((genre, i) => {
                return <p key={i}>{genre}</p>;
              })}
            </span>
            <span>{game.age_rating}</span>
          </div>
          <div>average user rating</div>
        </div>
      </div>
      <div>{game.summary}</div>
    </>
  );
}
