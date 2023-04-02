import React from 'react';
import { useRouter } from "next/router";
import css from './RelatedGames.module.css';

const RelatedGames = ({ relatedGames }) => {
  const router = useRouter();

  const handleClick = (title) => {
    router.push(`/search/${encodeURI(title)}`);
  };

  if (relatedGames.length === 0) {
    return (
      <div className={css.emptyRelatedGames}>
        <p>No related games yet, check back soon!</p>
      </div>
    );
  }

  return (
    <div className={css.relatedGamesContainer}>
      {relatedGames.map((title, index) => (
        <div
          key={index}
          className={css.gameCard}
          onClick={() => handleClick(title)}
        >
          <h3 className={css.gameTitle}>{title}</h3>
        </div>
      ))}
    </div>
  );
};

export default RelatedGames;
