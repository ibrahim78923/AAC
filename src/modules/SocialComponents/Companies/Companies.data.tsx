import { AvatarImage } from '@/assets/images';
import { DATE_FORMAT, SOCIAL_COMPONENTS } from '@/constants';
import { Avatar, Box, Checkbox, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

export const companyTabs: any = ['All Companies', 'My Companies'];

export const columns: any = (columnsProps: any) => {
  const navigate = useRouter();
  const theme = useTheme();

  const { checkedRows, setCheckedRows, companiesData, activeColumns } =
    columnsProps;

  const handleSelectCompaniesById = (checked: boolean, id: string): void => {
    if (checked) {
      setCheckedRows([...checkedRows, id]);
    } else {
      setCheckedRows(checkedRows?.filter((_id: any) => _id !== id));
    }
  };

  const handleSelectAllCompanies = (checked: boolean): void => {
    setCheckedRows(
      checked ? companiesData?.data?.companies?.map(({ _id }: any) => _id) : [],
    );
  };

  const activeColumnsData = (attribute: any, info: any) => {
    if (attribute === 'name') {
      return (
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            navigate?.push({
              pathname: SOCIAL_COMPONENTS?.VIEW_COMPANY_DETAILS,
              query: { id: info?.row?.original?._id },
            });
          }}
        >
          <Typography
            variant="body3"
            sx={{
              color: theme?.palette?.primary?.main,
              fontWeight: 500,
            }}
          >
            {info?.row?.original?.name ?? 'N/A'}
          </Typography>
        </Box>
      );
    } else if (attribute === 'owner.phoneNumber') {
      return info?.row?.original?.owner?.phoneNumber ?? 'N/A';
    } else if (attribute === 'owner.name') {
      return (
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Avatar alt="Remy Sharp" src={AvatarImage?.src} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component={'span'} variant="body3" fontWeight={500}>
              {info?.row?.original?.owner?.name ?? 'N/A'}
            </Typography>
            <Typography component={'span'} variant="body3">
              {info?.row?.original?.owner?.email ?? 'N/A'}
            </Typography>
          </Box>
        </Box>
      );
    } else if (attribute === 'createdAt') {
      return (
        dayjs(info?.row?.original?.createdAt)?.format(DATE_FORMAT?.UI) ?? 'N/A'
      );
    } else if (attribute === 'domain') {
      const url = info?.row?.original?.domain;
      // Check if the URL starts with http:// or https://
      const isExternal = /^https?:\/\//?.test(url);
      //       // If not, prepend "https://"
      const fullUrl = isExternal ? url : `https://${url}`;
      return (
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: theme?.palette?.blue?.link_blue,
            textDecoration: 'underline',
          }}
        >
          {url ?? 'N/A'}
        </a>
      );
    } else {
      return info?.row?.original[attribute] ?? 'N/A';
    }
  };

  const checkboxColumn = {
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
          companiesData?.data?.companies?.length &&
          checkedRows?.length === companiesData?.data?.companies?.length
        }
      />
    ),
    isSortable: false,
  };

  const tableActiveColumns =
    activeColumns?.map((col: any) => ({
      accessorFn: (row: any) => row?.attributes,
      id: col?.attributes,
      isSortable: true,
      header: col?.slug,
      cell: (info: any) => activeColumnsData(col?.attributes, info),
    })) || [];

  const columns = [checkboxColumn, ...tableActiveColumns];

  return columns;
  // return [
  //   {
  //     accessorFn: (row: any) => row?._id,
  //     id: 'Id',
  //     cell: ({ row: { original } }: any) => (
  //       <Checkbox
  //         checked={checkedRows?.includes(original?._id)}
  //         onChange={({ target }) => {
  //           handleSelectCompaniesById(target.checked, original?._id);
  //         }}
  //       />
  //     ),
  //     header: (
  //       <Checkbox
  //         onChange={({ target }) => {
  //           handleSelectAllCompanies(target.checked);
  //         }}
  //         checked={
  //           companiesData?.data?.companies?.length &&
  //           checkedRows?.length === companiesData?.data?.companies?.length
  //         }
  //       />
  //     ),
  //     isSortable: false,
  //   },
  //   {
  //     accessorFn: (row: any) => row?.owner,
  //     id: 'owner',
  //     header: 'Company Owner',
  //     isSortable: true,
  //     cell: (info: any) => (
  //       <Box sx={{ display: 'flex', gap: '5px' }}>
  //         <Avatar alt="Remy Sharp" src={AvatarImage?.src} />
  //         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
  //           <Typography component={'span'} variant="body3" fontWeight={500}>
  //             {info?.row?.original?.owner?.name ?? 'N/A'}
  //           </Typography>
  //           <Typography component={'span'} variant="body3">
  //             {info?.row?.original?.owner?.email ?? 'N/A'}
  //           </Typography>
  //         </Box>
  //       </Box>
  //     ),
  //   },
  //   {
  //     accessorFn: (row: any) => row?.name,
  //     id: 'name',
  //     header: 'Company Name',
  //     isSortable: true,
  //     cell: (info: any) => (
  //       <Box
  //         sx={{ cursor: 'pointer' }}
  //         onClick={() => {
  //           navigate?.push({
  //             pathname: SOCIAL_COMPONENTS?.VIEW_COMPANY_DETAILS,
  //             query: { id: info?.row?.original?._id },
  //           });
  //         }}
  //       >
  //         <Typography
  //           variant="body3"
  //           sx={{
  //             color: theme?.palette?.primary?.main,
  //             fontWeight: 500,
  //           }}
  //         >
  //           {info?.getValue() ?? 'N/A'}
  //         </Typography>
  //       </Box>
  //     ),
  //   },
  //   {
  //     accessorFn: (row: any) => row?.createdAt,
  //     id: 'createdDate',
  //     isSortable: true,
  //     header: 'Created Date',
  //     cell: (info: any) =>
  //       dayjs(info?.getValue())?.format(DATE_FORMAT?.UI) ?? 'N/A',
  //   },
  //   {
  //     accessorFn: (row: any) => row?.domain,
  //     id: 'domainName',
  //     isSortable: true,
  //     header: 'Domain Name',
  //     cell: (info: any) => {
  //       const url = info?.getValue();
  //       // Check if the URL starts with http:// or https://
  //       const isExternal = /^https?:\/\//?.test(url);
  //       // If not, prepend "https://"
  //       const fullUrl = isExternal ? url : `https://${url}`;
  //       return (
  //         <a
  //           href={fullUrl}
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           style={{
  //             color: theme?.palette?.blue?.link_blue,
  //             textDecoration: 'underline',
  //           }}
  //         >
  //           {url ?? 'N/A'}
  //         </a>
  //       );
  //     },
  //   },
  //   {
  //     accessorFn: (row: any) => row?.crn,
  //     id: 'crn',
  //     isSortable: true,
  //     header: 'CRN',
  //     cell: (info: any) => info?.getValue() ?? 'N/A',
  //   },
  //   {
  //     accessorFn: (row: any) => row?.owner?.phoneNumber,
  //     id: 'phoneNumber',
  //     isSortable: true,
  //     header: 'Phone Number',
  //     cell: (info: any) => info?.getValue() ?? 'N/A',
  //   },
  //   {
  //     accessorFn: (row: any) => row?.industry,
  //     id: 'industry',
  //     isSortable: true,
  //     header: 'Industry',
  //     cell: (info: any) => info?.getValue() ?? 'N/A',
  //   },
  // ];
};
