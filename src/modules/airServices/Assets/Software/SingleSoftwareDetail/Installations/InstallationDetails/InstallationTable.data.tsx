import { Checkbox } from '@mui/material';
import dayjs from 'dayjs';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { CALENDAR_FORMAT } from '@/constants';
import { TruncateText } from '@/components/TruncateText';
import { fullName } from '@/utils/avatarUtils';

export const installationTableColumns = (
  installationData: any,
  activeCheck: any,
  setActiveCheck: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={
            !!activeCheck?.find((item: any) => item?._id === info?.getValue())
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setActiveCheck([
                  ...activeCheck,
                  installationData?.find(
                    (item: any) => item?._id === info?.getValue(),
                  ),
                ])
              : setActiveCheck(
                  activeCheck?.filter((item: any) => {
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
          checked={
            !!installationData?.length
              ? activeCheck?.length === installationData?.length
              : false
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setActiveCheck([...installationData])
              : setActiveCheck([]);
          }}
          color="primary"
          name="_id"
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.displayName,
      id: 'displayName',
      header: 'Installation Machine',
      cell: (info: any) => (
        <TruncateText text={info?.getValue()?.toLowerCase()} />
      ),
    },
    {
      accessorFn: (row: any) => row?.userDetail,
      id: 'userDetail',
      header: 'User',
      cell: (info: any) => {
        const user = info?.getValue();
        return (
          <TruncateText text={fullName(user?.firstName, user?.lastName)} />
        );
      },
    },
    {
      accessorFn: (row: any) => row?.departmentDetail?.name,
      id: 'departmentDetail',
      header: 'Department',
      cell: (info: any) => (
        <TruncateText text={info?.getValue()?.toLowerCase()} />
      ),
    },
    {
      accessorFn: (row: any) => row?.installationDate,
      id: 'installationDate',
      header: 'Installation Date',
      cell: (info: any) => dayjs(info?.getValue())?.format(CALENDAR_FORMAT?.UI),
    },
  ];
};
