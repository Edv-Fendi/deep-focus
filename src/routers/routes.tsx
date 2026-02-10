import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { Loading } from '../components/Loading';
import { History } from '../pages/History';

const Home = lazy(() =>
  import('../pages/Home').then(module => ({ default: module.Home })),
);
const AboutPomodoro = lazy(() =>
  import('../pages/About').then(module => ({ default: module.AboutPomodoro })),
);
const NotFound = lazy(() =>
  import('../pages/NotFound').then(module => ({ default: module.NotFound })),
);

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-pomodoro/' element={<AboutPomodoro />} />
          <Route path='/history' element={<History />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
      <ScrollToTop />
    </BrowserRouter>
  );
}
