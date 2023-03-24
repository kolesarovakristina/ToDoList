import { FC, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { EPathsEnum } from './enums/PathsEnum';

import MainLayout from './components/MainLayout';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './routes/Home';

import './styles/_base.scss';

const fallback = <Loading />;

const AddList = lazy(() => import('./routes/AddList'));
const AddTask = lazy(() => import('./routes/AddTask'));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: EPathsEnum.HOME,
        element: <Home />,
      },
      {
        path: EPathsEnum.ADD_LIST,
        element: (
          <Suspense fallback={fallback}>
            <AddList />
          </Suspense>
        ),
      },
      {
        path: EPathsEnum.ADD_TASK,
        element: (
          <Suspense fallback={fallback}>
            <AddTask />
          </Suspense>
        ),
      },
    ],
  },
]);

const App: FC = () => <RouterProvider router={router} />;

export default App;
