import PulseLoader from 'react-spinners/PulseLoader';
import './LoaderDots.scss';
import React from 'react';

export default function LoaderDots() {
  return (
    <div className="loader-container">
      <PulseLoader
        color="white"
        size={10}
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"
      ></PulseLoader>
    </div>
  );
}
