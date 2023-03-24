import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';

const MainLayout: FC = () => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex justify-center h-full">
        <main className="max-w-screen-lg my-16">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
