import { TruncateText } from '@/components/TruncateText';
import { fullName } from '@/utils/avatarUtils';
import { uiDateFormat } from '@/lib/date-time';
import { CheckboxField } from '@/components/InputFields/CheckboxField';

export const installDevicesListColumnDynamic = (
  installationData: any,
  activeCheck: any,
  setActiveCheck: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <CheckboxField
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
          name={info?.getValue()}
        />
      ),
      header: (
        <CheckboxField
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
      cell: (info: any) => uiDateFormat(info?.getValue()),
    },
  ];
};
