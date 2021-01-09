import React, { useState, useEffect } from 'react';


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
    <div>
      <button type="button" onClick={handleTheme} > Theme </button>
    </div>
  );
}

export default App;
