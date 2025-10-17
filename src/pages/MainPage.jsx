import { lazy, Suspense } from 'react';
import About from '../sections/main/About';
import Contact from '../sections/main/Contact';
import Hero from '../sections/main/Hero';
import Loader from '../utils/Loader';
const Features = lazy(() => import('../sections/main/Features'));
const Story = lazy(() => import('../sections/main/Story'));
const Statistics = lazy(() => import('../sections/main/Statistics'));
const Vision = lazy(() => import('../sections/main/Vision'));

const MainPage = () => {
  return (
    <main className="relative min-h-screen">
      <Hero />
      <About />
      <Suspense fallback={<Loader containerClass="bg-black" />}>
        <Features />
      </Suspense>

      <Suspense fallback={<Loader containerClass="bg-black" />}>
        <Story />
      </Suspense>

      <Suspense fallback={<Loader containerClass="bg-black" />}>
        <Statistics />
      </Suspense>

      <Suspense fallback={<Loader containerClass="bg-black" />}>
        <Vision />
      </Suspense>
      <Suspense fallback={<Loader containerClass="bg-black" />}>
        <Contact />
      </Suspense>
    </main>
  );
};
export default MainPage;
