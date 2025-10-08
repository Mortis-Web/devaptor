import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/nav/Navbar';
import use3DTilt from './hooks/Use3DTilt';
import useLenis from './hooks/useLenis';
import MainPage from './pages/MainPage';

const App = () => {
  useLenis();
  use3DTilt();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
