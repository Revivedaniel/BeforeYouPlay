import React from 'react';
import css from './Extras.module.css';

const Extras: React.FC = () => {
  return (
    <div className={css.extrasMessage}>
      <p>No extras at the moment, come back later.</p>
    </div>
  );
};

export default Extras;
