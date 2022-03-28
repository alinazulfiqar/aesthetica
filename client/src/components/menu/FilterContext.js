import React from "react";
import { useState, createContext } from "react";

export const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const [filterArray, setFilterArray] = useState([]);
  const [medium, setMedium] = useState([])

  // state to toggle hamburger menu 
  const [hideMenu, setHideMenu] = useState(true)

  return (
    <FilterContext.Provider value={{ filterArray, setFilterArray, medium, setMedium,hideMenu,setHideMenu }}>
      {children}
    </FilterContext.Provider>
  );
};
