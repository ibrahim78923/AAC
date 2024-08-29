import { useGetSingleFolderByIdQuery } from '@/services/airServices/knowledge-base/articles';
import { ArticlesPortalComponentPropsI } from '../../Articles/Articles.interface';

export const useSingleFolderDetail = (props: ArticlesPortalComponentPropsI) => {
  const { selectedArticlesTab } = props;
  const apiDataParameter = {
    queryParams: {
      id: selectedArticlesTab?._id,
    },
  };

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  }: { [key: string]: any } = useGetSingleFolderByIdQuery(apiDataParameter, {
    refetchOnMountOrArgChange: true,
    skip: !!!selectedArticlesTab?._id,
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};
