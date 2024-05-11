import Header from '@/components/landingPage/Header';
import React from 'react';

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default HomePageLayout;
