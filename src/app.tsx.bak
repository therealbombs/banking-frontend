import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Home } from '@/components/features/home/Home';
import { NotFound } from '@/components/features/errors/NotFound';

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

export default App;