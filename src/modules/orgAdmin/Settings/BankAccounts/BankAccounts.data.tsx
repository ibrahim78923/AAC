import { capitalizeFirstLetter } from '@/utils/api';
import { Checkbox } from '@mui/material';

interface IBankAccountsColumns {
  checkedRows: any;
  setCheckedRows: any;
  receiversData: any;
}

export const bankAccountsColumns = (columnsProps: IBankAccountsColumns) => {
  const { checkedRows, setCheckedRows, receiversData } = columnsProps;

  const handleSelectCompaniesById = (checked: boolean, id: string): void => {
    if (checked) {
      setCheckedRows([...checkedRows, id]);
    } else {
      setCheckedRows(checkedRows?.filter((_id: string) => _id !== id));
    }
  };

  const handleSelectAllCompanies = (checked: boolean): void => {
    setCheckedRows(
      checked
        ? receiversData?.data?.receiverbankaccounts?.map(({ _id }: any) => _id)
        : [],
    );
  };

  return [
    {
      accessorFn: (row: any) => row?._id,
      id: 'Id',
      cell: ({ row: { original } }: any) => (
        <Checkbox
          checked={checkedRows?.includes(original?._id)}
          onChange={({ target }) => {
            handleSelectCompaniesById(target.checked, original?._id);
          }}
        />
      ),
      header: (
        <Checkbox
          onChange={({ target }) => {
            handleSelectAllCompanies(target.checked);
          }}
          checked={
            receiversData?.data?.receiverbankaccounts?.length &&
            checkedRows?.length ===
              receiversData?.data?.receiverbankaccounts?.length
          }
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.companyAccountName,
      id: 'companyAccounts',
      header: 'Company Account',
      isSortable: true,
      cell: (info: any) => capitalizeFirstLetter(info?.getValue()) ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.bankName,
      id: 'bankName',
      isSortable: true,
      header: 'Banks Name',
      cell: (info: any) => capitalizeFirstLetter(info?.getValue()) ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.accountHolder,
      id: 'accountHolder',
      header: 'Account Holder',
      isSortable: true,
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.accountNumber,
      id: 'accountNumber',
      isSortable: true,
      header: 'Account Number',
      cell: (info: any) => info?.getValue(),
    },
  ];
};
