import React from 'react';

const LoadingScreen = () => {
    return (
        <div className='spinner-overlay'>
          <div className="lds-ripple"><div></div><div></div></div>
        </div>
    );
};

export default LoadingScreen;