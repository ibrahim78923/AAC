import { useGetQuickLinksQuery } from '@/services/superAdmin/settings/quick-links';

const useEditLinks = () => {
  const { data, isLoading, isFetching } = useGetQuickLinksQuery({});

  const activeQuickLinksData = data?.data?.quicklinks?.filter(
    (item: any) => item.isActive,
  );

  return {
    activeQuickLinksData,
    isLoading,
    isFetching,
  };
};

export default useEditLinks;
