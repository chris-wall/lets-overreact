import React from 'react';

export default ({ message }) => (
  <div className="wait-spinner__container">
    <div className="wait-spinner">
      <h3>Loading</h3>
      <img src="/loading.gif" alt="Please wait..." />
      <div className="message">{message}</div>
    </div>
  </div>
);