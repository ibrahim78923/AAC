import { useRouter } from 'next/router';

export const useHeader = () => {
  const { push } = useRouter();

  return {
    push,
  };
};
