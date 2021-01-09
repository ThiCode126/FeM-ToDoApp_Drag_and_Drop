import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Body from './components/Body';


function App() {

  //Theme
  const [ isDark, setIsDark ] = useState(false);

  useEffect(() => {
    const classCard = isDark ? 'dark' : 'light';
    document.body.classList = `${classCard}-theme`;
  }, [isDark]);

  const handleTheme = () => {
    setIsDark(!isDark);
  }

  return (
    <>
      <Header handleTheme={handleTheme} isDark={isDark} />
      <Body />
    </>
  );
}

export default App;
