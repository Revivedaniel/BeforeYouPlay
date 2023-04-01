import React from 'react';
import css from './Credits.module.css';

const Credits = ({ credits }) => {
  if (credits.length === 0) {
    return (
      <div className={css.emptyCredits}>
        <p>No credits available yet. Come back soon for updates!</p>
      </div>
    );
  }

  return (
    <div className={css.creditsContainer}>
      {credits.map(({ title, entries }, index) => (
        <div key={index} className={css.creditSection}>
          <h2 className={css.sectionTitle}>{title}</h2>
          <ul className={css.entriesList}>
            {entries.map((entry, entryIndex) => (
              <li key={entryIndex} className={css.entryItem}>
                {entry}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Credits;
