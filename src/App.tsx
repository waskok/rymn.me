import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';

/**
 * Personal hub for rymn.me. The home view has one job: introduce me in a
 * single memorable screen, then point visitors toward the dedicated
 * portfolios (web development, video editing, ...) as they come online.
 */
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="kontakt" element={<Contact />} />
        <Route path="polityka-prywatnosci" element={<PrivacyPolicy />} />
      </Route>
    </Routes>
  );
}

export default App;
