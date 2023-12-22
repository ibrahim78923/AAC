import { useGetCallsQuery } from '@/services/commonFeatures/calling';

const useScheduleCalls = () => {
  const { data: Calls } = useGetCallsQuery({});

  return {
    Calls: Calls?.data,
  };
};

export default useScheduleCalls;
