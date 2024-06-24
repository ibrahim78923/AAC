export const dynamicQuestionOptions = (watchOptions: any) =>
  !!watchOptions?.length
    ? watchOptions?.map((item: any) => ({
        label: item?.text,
        value: item?.text,
      }))
    : [{ label: '1', value: '1' }];
export const dynamicQuestionType = {
  multipleChoice: 'multipleChoice',
  checkboxes: 'checkboxes',
  text: 'text',
};
