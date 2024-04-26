import { PageTitledHeader } from '@/components/PageTitledHeader';
import { RequestorsDetails } from './RequestorsDetails';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';

export const RequestorsViewDetails = () => {
  const router = useRouter();
  return (
    <>
      <PageTitledHeader
        moveBack={() =>
          router?.push({
            pathname: AIR_SERVICES?.REQUESTERS_SETTINGS,
          })
        }
        canMovedBack
        title={'Profile'}
      />
      <br />
      <RequestorsDetails />
    </>
  );
};
