import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const wrapRootElement = ({ element }) => {
  return (
    <BrowserRouter>
      {element}
    </BrowserRouter>
  );
};
