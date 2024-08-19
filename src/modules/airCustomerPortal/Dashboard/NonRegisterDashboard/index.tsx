import { PageTitledHeader } from '@/components/PageTitledHeader';
import { WelcomeCard } from '../WelcomeCard';
import { PopularArticles } from '../PopularArticles';

const NonRegisterDashboard = () => {
  return (
    <>
      <PageTitledHeader title="Customer Portal - Dashboards" />
      <WelcomeCard isRegister={false} />
      <br />
      <PopularArticles />
    </>
  );
};

export default NonRegisterDashboard;
