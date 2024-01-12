import { Checkbox } from '@mui/material';

export const bankAccountsColumns = [
  {
    accessorFn: (row: any) => row?.Id,
    id: 'Id',
    cell: (info: any) => (
      <Checkbox
        color="primary"
        name={info?.getValue()}
        // defaultChecked={checkedRows === info?.row?.original?._id}
        // onChange={(e: any) =>
        //   handleCheckboxChange(e, info?.row?.original?._id)
        // }
      />
    ),
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.companyAccounts,
    id: 'companyAccounts',
    header: 'Company Account',
    isSortable: true,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row?.banksName,
    id: 'banksName',
    isSortable: true,
    header: 'Banks Name',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row?.accountHolder,
    id: 'accountHolder',
    header: 'Account Holder',
    isSortable: true,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row?.accountNo,
    id: 'accountNo',
    isSortable: true,
    header: 'Account Number',
    cell: (info: any) => info.getValue(),
  },
];

export const bankAccountsData = [
  {
    companyAccounts: 'Orcalo holdings',
    banksName: 'Alfa Bank',
    accountHolder: 'Azeem Aslam',
    accountNo: '123123',
  },
  {
    companyAccounts: 'Orcalo holdings',
    banksName: 'Alfa Bank',
    accountHolder: 'Azeem Aslam',
    accountNo: '123123',
  },
  {
    companyAccounts: 'Orcalo holdings',
    banksName: 'Alfa Bank',
    accountHolder: 'Azeem Aslam',
    accountNo: '123123',
  },
  {
    companyAccounts: 'Orcalo holdings',
    banksName: 'Alfa Bank',
    accountHolder: 'Azeem Aslam',
    accountNo: '123123',
  },
];
