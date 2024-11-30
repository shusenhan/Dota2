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
import CreateLoginAnimation from './theme/createAnimation';
import AllHeroPage from "./page/heropage/AllHeroPage";
import HeroDataImportPage from "./page/herodataimport/importpage";
import { ToastContainer } from "react-toastify";
import SkillDataImportPage from "./page/skilldataimport/skillimportpage";
import ExistedHero from "./page/herodataimport/existhero";
import Footer from "./page/footer/footer";
import HeroPage from "./page/heropage/heropage";
import ImportCenter from "./page/herodataimport/importcenter";
import ExistedSkill from "./page/skilldataimport/existskill";
import TrainPage from "./page/practice/trainpage";
import ExistedItem from "./page/itemdataimport/existeditem";
import CommunityMianPage from "./page/community/community";
import PersonalCenter from "./page/personal/peronalcenter";
import CommunityAdministrationCenter from "./page/communitymanage/communitycenter";
import CreateCommunity from "./page/communitymanage/createcommunity";
import CommunityPage from "./page/community/communitypage";
import PostPage from "./page/community/postpage";

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
      <div className="AppBox2">
        <ToastContainer/>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <GlobalStyles styles={animation}/>
      
            <div className='Navbar'>
              <Navbar/>
            </div>

            <div className='Background'>
              <video autoPlay loop muted className="VideoBackground">
                <source src="http://localhost:3001/assets/videos/commons/background.webm" type="video/mp4"/>
              </video>
            </div>
              
            <Routes>
              <Route path='/personal' element={<div className='Content'><PersonalCenter/></div>}/>
              <Route path='/' element={<div className='Content'><HomePage/></div>}/>
              <Route path='/allhero' element={<div className='Content'><AllHeroPage/></div>}/>
              <Route path='/importcenter' element={<div className='Content'><ImportCenter/></div>}/>
              <Route path='/importcenter/hero' element={<div className='Content'><ExistedHero/></div>}/>
              <Route path='/importcenter/hero/import' element={<div className='Content'><HeroDataImportPage/></div>}/>
              <Route path='/importcenter/skill' element={<div className='Content'><ExistedSkill/></div>}/>
              <Route path='/importcenter/skill/import' element={<div className='Content'><SkillDataImportPage/></div>}/>
              <Route path='/importcenter/community' element={<div className='Content'><CommunityAdministrationCenter/></div>}/>
              <Route path='/importcenter/community/import' element={<div className='Content'><CreateCommunity/></div>}/>
              <Route path='/train' element={<div className='Content'><TrainPage/></div>}/>
              <Route path='/heroinfo' element={<div className='Content'><HeroPage/></div>}/>
              <Route path='/importcenter/item' element={<div className='Content'><ExistedItem/></div>}/>
              <Route path='/community' element={<div className='Content'><CommunityMianPage/></div>}/>
              <Route path='/community/:communityId' element={<div className='Content'><CommunityPage/></div>}/>
              <Route path='/post/:postId' element={<div className='Content'><PostPage/></div>}/>
            </Routes>

            <div className="Footer">
              <Footer/>
            </div>
            
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
