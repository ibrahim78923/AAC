import { ChangeEmail } from './ChangeEmail';
import { ChangePassword } from './ChangePassword';

export const AccountDetailsSecurity = () => {
  return (
    <>
      <ChangePassword />
      <br />
      <ChangeEmail />
    </>
  );
};
