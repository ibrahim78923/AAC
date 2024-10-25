import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { ARRAY_INDEX } from '@/constants/strings';
import { uiDateFormat } from '@/lib/date-time';
import { TruncateText } from '@/components/TruncateText';
import { UserInfo } from '@/components/UserInfo';

export const importTabColumns = [
  {
    accessorFn: (row: any) => row?.user,
    id: 'user',
    isSortable: true,
    header: 'User',
    cell: (info: any) => (
      <UserInfo
        nameInitial={fullNameInitial(
          info?.row?.original?.userDetails[ARRAY_INDEX?.ZERO]?.firstName,
          info?.row?.original?.userDetails[ARRAY_INDEX?.ZERO]?.lastName,
        )}
        name={fullName(
          info?.row?.original?.userDetails[
            ARRAY_INDEX?.ZERO
          ]?.firstName?.toLowerCase(),
          info?.row?.original?.userDetails[
            ARRAY_INDEX?.ZERO
          ]?.lastName?.toLowerCase(),
        )}
        avatarSrc={
          info?.row?.original?.userDetails[ARRAY_INDEX?.ZERO]?.avatar?.url
        }
        email={info?.row?.original?.userDetails[ARRAY_INDEX?.ZERO]?.email}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.filePath,
    id: 'filePath',
    isSortable: true,
    header: 'File Name',
    cell: (info: any) => {
      const url = new URL(info?.getValue());
      const fileName = url?.pathname?.split('/')?.pop();
      return (
        <a href={url?.href} download={fileName}>
          <TruncateText
            text={fileName?.toLowerCase()}
            boxProps={{ color: 'primary.main' }}
          />
        </a>
      );
    },
  },
  {
    accessorFn: (row: any) => row?.product,
    id: 'product',
    isSortable: true,
    header: 'Product',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.object,
    id: 'object',
    isSortable: true,
    header: 'Object',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created Date',
    cell: (info: any) => uiDateFormat(info?.getValue() ?? '---'),
  },
];
