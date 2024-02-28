import { useAuthIgVerificationMutation } from '@/services/airCustomerPortal/auth';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';

export default function useVerification() {
  const router: any = useRouter();
  const { email } = router?.query;

  const [postIgVerficationTrigger] = useAuthIgVerificationMutation();

  const resendLink = async () => {
    try {
      await postIgVerficationTrigger({
        email: { email },
      }).unwrap();
      successSnackbar('Email Sent Successfully!');
    } catch (error: any) {
      errorSnackbar();
    }
  };

  return { router, resendLink };
}
