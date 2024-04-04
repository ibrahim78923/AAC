import { useGetQuickLinksQuery } from '@/services/superAdmin/settings/quick-links';

const useEditLinks = () => {
  const { data: dataGetQuickLinks, isLoading: loagingGetQuickLinks } =
    useGetQuickLinksQuery({});

  return {
    dataGetQuickLinks,
    loagingGetQuickLinks,
  };
};

export default useEditLinks;
