import { Header } from './Header';
import { WelcomeCard } from '../WelcomeCard';
import { PopularArticles } from '../PopularArticles';

const NonRegisterDashboard = () => {
  return (
    <>
      <Header />
      <WelcomeCard isRegister={false} />
      <br />
      <PopularArticles />
    </>
  );
};

export default NonRegisterDashboard;
