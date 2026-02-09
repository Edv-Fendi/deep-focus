import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Loading } from '../components/Loading';

const Home = lazy(() =>
  import('../pages/Home').then(module => ({ default: module.Home })),
);
const AboutPomodoro = lazy(() =>
  import('../pages/About').then(module => ({ default: module.AboutPomodoro })),
);
const NotFound = lazy(() =>
  import('../pages/NotFound').then(module => ({ default: module.NotFound })),
);

export function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-pomodoro/' element={<AboutPomodoro />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
