import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';

const Contact = lazy(() =>
  import('./pages/Contact').then((module) => ({ default: module.Contact })),
);
const PrivacyPolicy = lazy(() =>
  import('./pages/PrivacyPolicy').then((module) => ({ default: module.PrivacyPolicy })),
);
const Terms = lazy(() =>
  import('./pages/Terms').then((module) => ({ default: module.Terms })),
);
const NotFound = lazy(() =>
  import('./pages/NotFound').then((module) => ({ default: module.NotFound })),
);

/**
 * Main site for rymn.me — introduces services and routes visitors to
 * dedicated portfolios (web development, design, video) as they come online.
 */
function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="kontakt" element={<Contact />} />
          <Route path="polityka-prywatnosci" element={<PrivacyPolicy />} />
          <Route path="regulamin" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
