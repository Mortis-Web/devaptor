import About from '../sections/main/About';
import Contact from '../sections/main/Contact';
import Features from '../sections/main/Features';
import Hero from '../sections/main/Hero';
import Statis from '../sections/main/Statis';
import Story from '../sections/main/Story';

const MainPage = () => {
  return (
    <main className="relative min-h-screen">
      <Hero />
      <About />
      <Features />
      {/* <Statis /> */}
      <Story />
      <Contact />
    </main>
  );
};

export default MainPage;
