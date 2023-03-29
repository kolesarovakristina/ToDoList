import { FC, lazy, ReactNode, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { EPathsEnum } from './enums/PathsEnum';
import TasksProvider from './store/providers/TaskProvider';

import BaseLayout from './components/_layout/BaseLayout';

import Home from './routes/Home';
import MainLayout from './components/_layout/MainLayout';
import Loading from './components/_scaffolding/Loading';
import ErrorBoundary from './components/_scaffolding/ErrorBoundary';

import './styles/_base.scss';

const fallback = <Loading />;

const ViewDetails = lazy(() => import('./routes/ViewDetails'));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: EPathsEnum.HOME,
        element: (
          <BaseLayout>
            <Home />
          </BaseLayout>
        ),
      },
      {
        path: EPathsEnum.VIEW_DETAILS,
        element: (
          <Suspense fallback={fallback}>
            <ViewDetails />
          </Suspense>
        ),
      },
    ],
  },
]);

const App: FC = () => (
  <TasksProvider>
    <RouterProvider router={router} />
  </TasksProvider>
);

export default App;
