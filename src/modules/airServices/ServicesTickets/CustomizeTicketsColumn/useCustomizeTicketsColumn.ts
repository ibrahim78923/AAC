import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';

export const useCustomizeTicketColumn = (props: any) => {
  const { setIsDrawerOpen } = props;
  const theme = useTheme();
  const router = useRouter();
  const submit = () => {};

  const onClose = () => {
    const { ...restQueries } = router?.query;
    router.push({
      pathname: router?.pathname,
      query: {
        ...restQueries,
      },
    });
    setIsDrawerOpen(false);
  };
  return {
    submit,
    onClose,
    theme,
  };
};
