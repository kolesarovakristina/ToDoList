import { FC, ReactNode } from 'react';

type TBaseLayoutProps = {
  readonly children: ReactNode;
};

const BaseLayout: FC<TBaseLayoutProps> = ({ children }) => (
  <div className="flex flex-col max-h-screen min-h-0 h-full">
    <div className="overflow-auto grow">
      <div className="max-w-screen-lg m-auto h-full w-full">{children}</div>
    </div>
  </div>
);

export default BaseLayout;
