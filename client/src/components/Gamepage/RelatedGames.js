import React from 'react';
import { useNavigate } from "react-router-dom";
import css from './RelatedGames.module.css';

const RelatedGames = ({ relatedGames }) => {
  const navigate = useNavigate();

  const handleClick = (title) => {
    navigate(`/search/${encodeURI(title)}`);
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
