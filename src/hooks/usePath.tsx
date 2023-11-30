import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const usePath = () => {
  const router = useRouter();
  const query = router?.query;

  const makePath = ({
    path = '',
    passOldQuery = true,
    queryParams = {},
    skipQueries = [''],
  }) => {
    const filteredParams = { ...query };
    skipQueries?.forEach((queryKey) => {
      if (queryKey in filteredParams) delete filteredParams?.[queryKey];
    });
    const pathObject = {
      pathname: path,
      query: {
        ...(passOldQuery && filteredParams),
        ...queryParams,
      },
    };
    return pathObject;
  };

  return { makePath, query };
};
export default usePath;
