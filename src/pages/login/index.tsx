import GuestGuard from '@/GuardsAndPermissions/GuestGuard';
import Login from '@/modules/auth/Login';

const LoginPage = () => {
  return (
    <GuestGuard>
      <Login />
    </GuestGuard>
  );
};
export default LoginPage;
