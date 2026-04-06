import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./styles.js";
import SplashScreen from './SplashScreen.jsx';
import { Nav } from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Works from './pages/Works.jsx';
import History from './pages/History.jsx';



export default function App() {
  return (
    <>
      <style>{styles}</style>
      <BrowserRouter>
        <Routes>
          <Route path="/"        element={<SplashScreen />} />
          <Route path="/home"    element={<><Nav /><Home /></>} />
          <Route path="/about"   element={<><Nav /><About /></>} />
          <Route path="/works"   element={<><Nav /><Works /></>} />
          <Route path="/history" element={<><Nav /><History /></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
