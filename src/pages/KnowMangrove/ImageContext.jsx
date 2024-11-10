import React, { createContext, useState } from 'react';
export const ImageContext = createContext();
export const ImageProvider = ({ children }) => {
  const [data, setData] = useState({});

  return (
    <ImageContext.Provider value={{ data, setData }}>
      {children}
    </ImageContext.Provider>
  );
};
