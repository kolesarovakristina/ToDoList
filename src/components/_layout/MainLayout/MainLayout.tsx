import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../../_scaffolding/Footer';
import Header from '../../_scaffolding/Header';

const MainLayout: FC = () => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex justify-center h-full overflow-hidden p-10">
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
