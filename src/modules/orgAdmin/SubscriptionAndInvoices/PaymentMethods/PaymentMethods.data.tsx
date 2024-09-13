import { useTheme } from '@emotion/react';
import { Box, Checkbox } from '@mui/material';

export const columns = (
  setIsGetRowValues: any,
  isGetRowValues: any,
  dataPaymentCard: any,
) => {
  const handleSelectCompaniesById = (checked: boolean, id: string): void => {
    if (checked) {
      setIsGetRowValues([...isGetRowValues, id]);
    } else {
      setIsGetRowValues(isGetRowValues?.filter((_id: any) => _id !== id));
    }
  };

  const handleSelectAllCompanies = (checked: boolean): void => {
    setIsGetRowValues(
      checked
        ? dataPaymentCard?.data?.payments?.map(({ _id }: any) => _id)
        : [],
    );
  };
  const theme = useTheme();

  return [
    {
      accessorFn: (row: any) => row?.id,
      id: 'id',
      cell: ({ row: { original } }: any) => (
        <Checkbox
          checked={isGetRowValues?.includes(original?._id)}
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
            dataPaymentCard?.data?.payments?.length &&
            isGetRowValues?.length === dataPaymentCard?.data?.payments?.length
          }
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.cardHolderName,
      id: 'cardHolderName',
      cell: (info: any) => (
        <>
          <Box sx={{ fontWeight: '500', color: 'blue.dull_blue' }}>
            {info?.getValue() ?? 'N/A'}
          </Box>
        </>
      ),
      header: 'Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.billingAddress,
      id: 'billingAddress',
      isSortable: true,
      header: 'Billing Address',
      cell: (info: any) => (
        <>
          <Box sx={{ fontWeight: '500', color: 'blue.dull_blue' }}>
            {info?.row?.original?.organizations?.address?.street},
            {info?.row?.original?.organizations?.address?.city},
            {info?.row?.original?.organizations?.address?.state}
          </Box>
        </>
      ),
    },
    {
      accessorFn: (row: any) => row?.expirationDate,
      id: 'expirationDate',
      isSortable: true,
      header: 'Expiration Date',
      cell: (info: any) => (
        <>
          <Box sx={{ fontWeight: '500', color: 'blue.dull_blue' }}>
            {info?.row?.original?.expMonth}/{info?.row?.original?.expYear}
          </Box>
        </>
      ),
    },
    {
      accessorFn: (row: any) => row?.brand,
      id: 'brand',
      isSortable: true,
      header: 'Card Type',
      cell: (info: any) => (
        <Box sx={{ fontWeight: '500', color: 'blue.dull_blue' }}>
          {info?.getValue()} &nbsp;
          {info?.row?.original?.isDefault && (
            <span
              style={{
                color: theme?.palette?.common?.white,
                backgroundColor: theme?.palette?.primary?.main,
                width: 'fit-content',
                padding: '3px 7px',
                borderRadius: '5px',
              }}
            >
              Default
            </span>
          )}
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.last4,
      id: 'last4',
      isSortable: true,
      header: 'Card Number',
      cell: (info: any) => (
        <>
          <Box sx={{ fontWeight: '500', color: 'blue.dull_blue' }}>
            **** **** **** {info?.getValue()}
          </Box>
        </>
      ),
    },
  ];
};
