import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';

export const useCustomizeTicketColumn = (props: any) => {
  const {
    // tableColumns = [],
    // checkboxClick,
    // customizeColumn,
    // isDrawerOpen,
    // onClose,
    setIsDrawerOpen,
  } = props;
  const theme = useTheme();
  const router = useRouter();
  const submit = () => {
    // const newTableColumns = tableColumns.filter(
    //   (x: any) => customizeColumn[x.id],
    // );
  };

  // const checkboxHandler = (co: any) => {
  //   if (customizeColumn[co.id]) {
  //     delete customizeColumn[co.id];

  //     // const { [keys], ...restCustomize } = customizeColumn;
  //     // setCustomizeColumn({
  //     //   // ...restCustomize,
  //     // });
  //     return;
  //   }
  //   // setCustomizeColumn({
  //   //   ...customizeColumn,
  //   //   [co.id]: true,
  //   // });
  // };
  const onClose = () => {
    const { tableAction, ...restQueries } = router?.query;
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
