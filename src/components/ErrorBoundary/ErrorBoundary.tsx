import { FC } from 'react';
import { useRouteError } from 'react-router-dom';

enum EErrorBoundaryMessages {
  NOT_EXIST = 'Prepáčte, stránka ktorú sa pokúšate navštíviť, zrejme neexistuje.',
  CONTACT_US = 'V prípade pretrvávajúcich problémov, nás prosím, nižšie kontaktujte.',
}

const ErrorBoundary: FC = () => {
  const error: any = useRouteError();

  if (
    error.status === 404 &&
    error.data.startsWith('Error: No route matches URL')
  ) {
    return (
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-5xl">
            <h1 className="text-5xl font-bold">
              {EErrorBoundaryMessages.NOT_EXIST}
            </h1>
            <p className="py-6">{EErrorBoundaryMessages.CONTACT_US}</p>
            <button className="btn btn-primary">Kontaktujte nás</button>
          </div>
        </div>
      </div>
    );
  }

  return <div>{error.message}</div>;
};

export default ErrorBoundary;
