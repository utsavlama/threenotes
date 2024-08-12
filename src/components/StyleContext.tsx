import React, { createContext, useContext } from 'react';

export const StyleContext = createContext<any>(null);

export const useStyles = () => useContext(StyleContext);