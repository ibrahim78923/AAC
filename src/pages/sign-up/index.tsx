import GuestGuard from '@/GuardsAndPermissions/GuestGuard';
import SignUp from '@/modules/auth/SignUp';

const SignUpPage = () => {
  return (
    <>
      <GuestGuard>
        <SignUp />
      </GuestGuard>
    </>
  );
};
export default SignUpPage;
