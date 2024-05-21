import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import {
  ThemeProvider, 
  CssBaseline, 
  createTheme,
  useMediaQuery,
  GlobalStyles
} from '@mui/material';
import './App.css';
import HomePage from './page/homepage/homepage';
import { useMemo, useState } from 'react';
import { themeSetting } from './theme';
import Navbar from './page/navbar/navbar';
import UserBox from './component/UserBox/UserBox';
import CreateLoginAnimation from './theme/createAnimation';
import HeroPage from "./page/heropage/heropage";
import HeroDataImportPage from "./page/herodataimport/importpage";
import { ToastContainer } from "react-toastify";
import SkillDataImportPage from "./page/skilldataimport/skillimportpage";

function App() {
  const [mode, setMode] = useState("1");
  const theme = useMemo(() => createTheme(themeSetting(mode),[mode]))
  const animation = CreateLoginAnimation('#F78C00');
  const largeScreen = useMediaQuery("(min-width:1000px)");

  const SwitchTheme = () => {
    console.log("switchtheme");
    if(mode === "1"){
      setMode("2");
    }
    else{
      setMode("1");
    }
    console.log("mode: ",theme);
  };

  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <div className='AppBackground' style={{backgroundImage:`url(${theme.picture.background})`}}/>
          <GlobalStyles styles={animation}/>
    
          <div className='Navbar'>
            <Navbar/>
          </div>

          <div className="FirstBox">
            {largeScreen && (
              <div className="UserBox">
                  123
                  <UserBox/>
              </div>
            )}

            <Routes>
              <Route path='/' element={<div className='Content'><HomePage/></div>}/>
              <Route path='/hero' element={<div className='Content'><HeroPage/></div>}/>
              <Route path='/importhero' element={<div className='Content'><HeroDataImportPage/></div>}/>
              <Route path='/importskill' element={<div className='Content'><SkillDataImportPage/></div>}/>
            </Routes>
          </div>
          
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
