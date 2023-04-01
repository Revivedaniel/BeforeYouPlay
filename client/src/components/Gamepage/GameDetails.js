import React from 'react';
import css from './GameDetails.module.css';

const GameDetails = ({ platforms, ageRatings, releaseDates, developers, publishers, genres, gameModes, series }) => {
  const renderListItems = (items) => {
    return items.map((item, index) => <li key={index}>{item}</li>);
  };

  const renderAgeRatings = () => {
    return ageRatings.map(({ title, rating }, index) => (
      <li key={index}>{`${title}: ${rating}`}</li>
    ));
  };

  const renderReleaseDates = () => {
    return releaseDates.map(({ title, date }, index) => (
      <li key={index}>{`${title}: ${date}`}</li>
    ));
  };

  return (
    <div className={css.gameDetailsContainer}>
      <h2>Platforms</h2>
      <ul>{renderListItems(platforms)}</ul>

      <h2>Age Ratings</h2>
      <ul>{renderAgeRatings()}</ul>

      <h2>Release Dates</h2>
      <ul>{renderReleaseDates()}</ul>

      <h2>Developers</h2>
      <ul>{renderListItems(developers)}</ul>

      <h2>Publishers</h2>
      <ul>{renderListItems(publishers)}</ul>

      <h2>Genres</h2>
      <ul>{renderListItems(genres)}</ul>

      <h2>Game Modes</h2>
      <ul>{renderListItems(gameModes)}</ul>

      <h2>Series</h2>
      <p>{series}</p>
    </div>
  );
};

export default GameDetails;
