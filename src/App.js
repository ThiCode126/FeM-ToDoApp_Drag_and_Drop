import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import { DndProvider } from 'react-dnd';
//import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend'
import Footer from './components/Footer';


function App() {

  //Theme
  const [ isDark, setIsDark ] = useState(false);

  useEffect(() => {
    const rootDiv = document.getElementById('root');
    const classCard = isDark ? 'dark' : 'light';
    rootDiv.classList = `${classCard}-theme`;
  }, [isDark]);

  const handleTheme = () => {
    setIsDark(!isDark);
  }

  return (
    
    <DndProvider backend={TouchBackend}>
      <Header handleTheme={handleTheme} isDark={isDark} />
      <Body />
      <Footer />
    </DndProvider>
  );
}

export default App;
