import React from "react";
import css from "./GameDetails.module.css";

interface AgeRating {
  title: string;
  rating: string;
}

interface ReleaseDate {
  title: string;
  date: string;
}

interface GameDetailsProps {
  platforms: string[];
  ageRatings: AgeRating[];
  releaseDates: ReleaseDate[];
  developers: string[];
  publishers: string[];
  genres: string[];
  gameModes: string[];
  series: string;
}

const GameDetails: React.FC<GameDetailsProps> = ({
  platforms,
  ageRatings,
  releaseDates,
  developers,
  publishers,
  genres,
  gameModes,
  series,
}) => {
  const renderListItems = (items: string[]) => {
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
    <section className={css.gameDetailsContainer}>
      <article>
        <h2>Platforms</h2>
        <ul>{renderListItems(platforms)}</ul>
      </article>

      <article>
        <h2>Age Ratings</h2>
        <ul>{renderAgeRatings()}</ul>
      </article>

      <article>
        <h2>Release Dates</h2>
        <ul>{renderReleaseDates()}</ul>
      </article>

      <article>
        <h2>Developers</h2>
        <ul>{renderListItems(developers)}</ul>
      </article>

      <article>
        <h2>Publishers</h2>
        <ul>{renderListItems(publishers)}</ul>
      </article>

      <article>
        <h2>Genres</h2>
        <ul>{renderListItems(genres)}</ul>
      </article>

      <article>
        <h2>Game Modes</h2>
        <ul>{renderListItems(gameModes)}</ul>
      </article>

      <article>
        <h2>Series</h2>
        <p>{series}</p>
      </article>
    </section>
  );
};

export default GameDetails;
