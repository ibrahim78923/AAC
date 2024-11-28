import { useRouter } from 'next/router';

const useViewDetails = () => {
  const router = useRouter();
  const contactId = router?.query?.contactId;

  return {
    contactId,
  };
};

export default useViewDetails;
