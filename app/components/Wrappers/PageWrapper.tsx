import { ReactNode } from 'react';

function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col bg-zinc-100 flex-grow pb-4">
      {children}
    </div>
  );
}

export default PageWrapper;