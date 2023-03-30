import { FC, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { EPathsEnum } from 'src/enums/PathsEnum';
import TasksProvider from 'src/store/providers/TaskProvider';

import Home from 'src/routes/Home';

import BaseLayout from 'src/components/_layout/BaseLayout';
import MainLayout from 'src/components/_layout/MainLayout';
import Loading from 'src/components/_scaffolding/Loading';
import ErrorBoundary from 'src/components/_scaffolding/ErrorBoundary';

import 'src/styles/_base.scss';

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
