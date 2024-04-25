import { useRouter } from 'next/router';

export const useMeetings = () => {
  const router = useRouter();
  return { router };
};
