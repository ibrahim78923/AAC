import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { Checkbox } from '@mui/material';
import * as Yup from 'yup';
export const createPowerDialerFieldsDefaultValues = (data?: any) => {
  return {
    title: data?.title ?? '',
    contacts: data?.contacts ?? '',
  };
};
export const createPowerDialerSchema: any = Yup?.object()?.shape({
  folderName: Yup?.string()
    ?.trim()
    ?.required('Folder Name is Required')
    ?.min(3, 'At least 3 characters Required')
    ?.max(30, 'Must not exceed 30 characters'),
});
export const createPowerDialerDropDownData: any = ['Contacts', 'Groups'];
export const createPowerDialerDropDown = (setButtonName: any) =>
  createPowerDialerDropDownData?.map((item: any) => ({
    title: item,
    handleClick: (close: any) => {
      setButtonName(item);
      close();
    },
  }));
export const createPowerDialerColumns = (
  responsesData: any,
  setResponsesData: any,
  responsesMainData: any,
): any => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!responsesData?.find((item: any) => item?._id === info?.getValue())
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setResponsesData([
                ...responsesData,
                responsesMainData?.find(
                  (item: any) => item?._id === info?.getValue(),
                ),
              ])
            : setResponsesData(
                responsesData?.filter((item: any) => {
                  return item?._id !== info?.getValue();
                }),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={responsesData?.length === responsesMainData?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setResponsesData([...responsesMainData])
            : setResponsesData([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: (info: any) => info?.getValue(),
    header: 'Title',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.phoneNo,
    id: 'phoneNo',
    cell: (info: any) => info?.getValue(),
    header: 'Phone Number',
    isSortable: true,
  },
];
export const createPowerDialerData = [
  {
    _id: '0',
    name: 'Power Dialer',
    phoneNo: '1234567890',
  },
  {
    _id: '1',
    name: 'Power Dialer',
    phoneNo: '1234567890',
  },
];
