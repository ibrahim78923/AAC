export const transferTypeDropDownData: any = [
  'Warm Transfer',
  'Cold Transfer',
  'Add Participants',
  'Parallel Call',
];
export const transferTypeDropDown = () =>
  transferTypeDropDownData?.map((item: any) => ({
    title: item,
    handleClick: (close: any) => {
      close();
    },
  }));
