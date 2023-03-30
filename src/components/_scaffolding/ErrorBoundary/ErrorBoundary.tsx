import { FC } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

import Button from 'src/components/_scaffolding/Button';

enum EErrorBoundaryMessages {
  NOT_EXIST = 'Sorry, the page you are trying to access does not exist',
}

const ErrorBoundary: FC = () => {
  const error: any = useRouteError();
  const navigate = useNavigate();

  if (
    error.status === 404 &&
    error.data.startsWith('Error: No route matches URL')
  ) {
    return (
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-5xl">
            <h1 className="text-2xl font-semibold pb-5">
              {EErrorBoundaryMessages.NOT_EXIST}
            </h1>
            <Button
              className="btn btn-primary"
              onClick={() => navigate('/')}
              label="Back to home"
            />
          </div>
        </div>
      </div>
    );
  }

  return <div>{error.message}</div>;
};

export default ErrorBoundary;
