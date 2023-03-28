import { FC, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { EPathsEnum } from './enums/PathsEnum';
import TasksProvider from './provider/ProductsProvider';

import Home from './routes/Home';
import MainLayout from './components/MainLayout';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';

import './styles/_base.scss';

const fallback = <Loading />;

const AddList = lazy(() => import('./routes/AddList'));
const AddTask = lazy(() => import('./routes/AddTask'));
const ViewDetails = lazy(() => import('./routes/ViewDetails'));

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
        path: EPathsEnum.VIEW_DETAILS,
        element: (
          <Suspense fallback={fallback}>
            <ViewDetails />
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

const App: FC = () => (
  <TasksProvider>
    <RouterProvider router={router} />
  </TasksProvider>
);

export default App;
