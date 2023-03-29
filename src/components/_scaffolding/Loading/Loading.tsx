import { FC } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loading: FC = () => (
  <div className="flex justify-center items-center h-full">
    <ClipLoader
      color="#6600FF"
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
);

export default Loading;
