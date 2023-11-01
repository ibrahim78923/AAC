import React from 'react';
import { Header } from './Header';
import { WelcomeCard } from './WelcomeCard';
import { PopularArticles } from './PopularArticles';
import { PendingApprovals } from './PendingApprovals';
import { articlesData } from './CustomerPortal.data';

const CustomerPortal = () => {
  return (
    <>
      <Header />
      <br />
      <WelcomeCard />
      <br />
      <PopularArticles articles={articlesData} />
      <br />
      <PendingApprovals />
    </>
  );
};

export default CustomerPortal;
