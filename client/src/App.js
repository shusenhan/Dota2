import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
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
import { ChatProvider } from "./component/Chat/useChat.jsx";
import AutoLogin from "./component/autoLogin.jsx";
import Background from "./Background.jsx";
import { SettingProvider } from "./page/setting/useSetting.js";
import Introduction3D from "./page/practice/fornew/introduction3D.jsx";
import GamePage from "./page/game/gamepage.jsx";
import { GameContextProvider } from "./component/useGame.jsx";
import { AnimationProvider } from "./component/useAnimations.jsx";
import { useSelector } from "react-redux";

function App() {
  const [mode, setMode] = useState("1");
  const theme = useMemo(() => createTheme(themeSetting(mode),[mode]))
  const animation = CreateLoginAnimation('#F78C00');
  const largeScreen = useMediaQuery("(min-width:1000px)");
  const game = useSelector(state => state.game)



  return (
    <AnimationProvider>
      <GameContextProvider>
        <ChatProvider>
          <SettingProvider>
            <div className="App">
              <div className="AppBox2">
                <ToastContainer/>
                <BrowserRouter>
                  <CssBaseline/>
                  <GlobalStyles styles={animation}/>

                  <AutoLogin/>
            
                  <div className='Navbar'>
                    <Navbar/>
                  </div>

                  <div className='Background'>
                    <Background/>
                  </div>

                  <div>
                    {game && <GamePage/>}
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
                    <Route path='/train/intro3D/:type' element={<div className='Content'><Introduction3D/></div>}/>
                    <Route path='/heroinfo' element={<div className='Content'><HeroPage/></div>}/>
                    <Route path='/importcenter/item' element={<div className='Content'><ExistedItem/></div>}/>
                    <Route path='/community' element={<div className='Content'><CommunityMianPage/></div>}/>
                    <Route path='/community/:communityId' element={<div className='Content'><CommunityPage/></div>}/>
                    <Route path='/post/:postId' element={<div className='Content'><PostPage/></div>}/>
                  </Routes>

                  <div className="Footer">
                    <Footer/>
                  </div>
                    
                </BrowserRouter>
              </div>
            </div>
          </SettingProvider>
        </ChatProvider>
      </GameContextProvider>
    </AnimationProvider>
  );
}

export default App;
