import React from 'react';

const Loader = () => {
  return (
    <div className="app-loader" role="status" aria-live="polite">
      <div className="loader-inner">
        <div className="loader-spinner" aria-hidden="true"></div>
        <p className="loader-text">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
