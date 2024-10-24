import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { uiDateFormat } from '@/lib/date-time';
import { UserInfo } from '@/components/UserInfo';
import { TruncateText } from '@/components/TruncateText';

export const exportTabColumns = [
  {
    accessorFn: (row: any) => row?.user,
    id: 'user',
    isSortable: true,
    header: 'User',
    cell: (info: any) => (
      <UserInfo
        nameInitial={fullNameInitial(info?.row?.original?.userFullName)}
        name={fullName(info?.row?.original?.userFullName?.toLowerCase())}
        avatarSrc={info?.row?.original?.avatar}
        email={info?.row?.original?.email}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.fileName,
    id: 'fileName',
    isSortable: true,
    header: 'File Name',
    cell: (info: any) => {
      const url = new URL(info?.row?.original?.fileName);
      const fileName = url?.pathname?.replace(/^\//, '');
      return (
        <a href={url?.href} download={fileName}>
          {
            <TruncateText
              text={fileName?.toLowerCase()}
              boxProps={{ color: 'primary.main' }}
            />
          }
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
    accessorFn: (row: any) => row?.noOfRecords,
    id: 'noOfRecords',
    isSortable: true,
    header: 'No of Records',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created Date',
    cell: (info: any) => uiDateFormat(info?.getValue() ?? '---'),
  },
];
