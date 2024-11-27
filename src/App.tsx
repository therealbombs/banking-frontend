import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layouts/MainLayout';
import { Home } from './features/home/Home';
import { NotFound } from './features/errors/NotFound';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};