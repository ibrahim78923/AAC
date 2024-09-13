import { WelcomeCard } from '../WelcomeCard';
import { PopularArticles } from '../PopularArticles';
import { Header } from './Header';

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
