export const useCustomizeTicketColumn = (props: any) => {
  const {
    // tableColumns = [],
    // checkboxClick,
    // customizeColumn,
    // isDrawerOpen,
    // onClose,
    // setIsDrawerOpen,
  } = props;
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
  return {
    submit,
  };
};
