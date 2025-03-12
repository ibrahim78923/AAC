import { TruncateText } from '@/components/TruncateText';
import { fullName } from '@/utils/avatarUtils';
import { uiDateFormat } from '@/lib/date-time';
import { tableCheckbox } from '@/utils/table-checkbox';

export const installDevicesListColumnDynamic = (
  installationData: any,
  activeCheck: any,
  setActiveCheck: any,
) => {
  return [
    tableCheckbox({
      selectedList: activeCheck,
      setSelectedList: setActiveCheck,
      tableData: installationData,
    }),
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
