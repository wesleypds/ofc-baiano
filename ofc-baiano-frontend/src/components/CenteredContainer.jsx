import React from 'react';
import "../style/components/CenteredContainer.css"

const CenteredContainer = ({ children }) => {
  return (
    <div className="centered-container">
        {children}
    </div>
  );
};

export default CenteredContainer;
