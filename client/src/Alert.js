import React from 'react';

export default ({ type, message }) => (
  <div className={`alert alert-${type}`}>
    <span>{(message === 'error' ? 'X' : (message === 'warning' ? '!' : String.fromCharCode(10004)))}</span>
    <span>{message}</span>
  </div>
);
