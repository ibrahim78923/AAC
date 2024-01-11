import useAuth from '@/hooks/useAuth';

const useDetailCard = () => {
  const { user }: any = useAuth();
  return { user };
};

export default useDetailCard;
