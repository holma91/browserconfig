import { ReactNode } from 'react';
import Header from './Header';
import Header2 from './Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header2 />
      {children}
    </>
  );
}
