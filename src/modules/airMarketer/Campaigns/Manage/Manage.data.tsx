import React from 'react';
import { Box, Checkbox, Tooltip, Typography } from '@mui/material';
import RHFSelect from '@/components/ReactHookForm/RHFSelect';
import RHFDatePicker from '@/components/ReactHookForm/RHFDatePicker';
import { RHFTextField } from '@/components/ReactHookForm';
import { ExpandMore } from '@mui/icons-material';
import { SwitchBtn } from '@/components/SwitchButton';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';
import { useRouter } from 'next/router';
import { capitalizeFirstLetters } from '@/utils';
import { capitalizeFirstLetter } from '@/utils/api';

export const columns = (
  selectedRows: string[],
  setSelectedRows: (value: string[]) => void,
  setIsActionsDisabled: (value: boolean) => void,
  setRowId: any,
  activeColumns: any,
) => {
  const router = useRouter();
  const handleRowClick = (id: any, status: string) => {
    const selectedIndex = selectedRows?.indexOf(id);

    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected?.concat(selectedRows, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected?.concat(selectedRows?.slice(1));
    } else if (selectedIndex === selectedRows?.length - 1) {
      newSelected = newSelected?.concat(selectedRows?.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected?.concat(
        selectedRows?.slice(0, selectedIndex),
        selectedRows?.slice(selectedIndex + 1),
      );
    }
    setSelectedRows(newSelected);
    setIsActionsDisabled(newSelected?.length === 0);
    if (newSelected?.length === 1) {
      setRowId(newSelected[0]);
    } else {
      setRowId(null);
    }
    router.push({
      ...(newSelected?.length > 0 && {
        query: { status: status, id: id },
      }),
    });
  };

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    rows: any,
  ) => {
    if (event?.target?.checked) {
      const newSelected = rows?.map((n: any) => n?._id);
      setSelectedRows(newSelected);
      setIsActionsDisabled(false);
      return;
    }
    setSelectedRows([]);
    setIsActionsDisabled(true);
  };

  const isSelected = (id: any) => selectedRows?.indexOf(id) !== -1;

  const CAMNPAIGNS_ATTRIBUTES = {
    campaignOwner: 'userDetails.name',
    campaignGoal: 'campaignGoal',
    campaignAudience: 'campaignAudience',
    campaignbudget: 'campaignBudget',
    campaignStatus: 'campaignStatus',
    description: 'description',
    startDate: 'startDate',
    endDate: 'endDate',
    title: 'title',
  };

  const activeColumnsData = (attribute: any, info: any) => {
    const userDetails = info?.row?.original?.userDetails;
    const userName = userDetails
      ? `${userDetails?.firstName} ${userDetails?.lastName}` ?? 'N/A'
      : 'N/A';
    const userEmail = userDetails ? userDetails?.email : 'N/A';
    if (attribute === CAMNPAIGNS_ATTRIBUTES?.title) {
      return capitalizeFirstLetters(info?.row?.original?.title) ?? 'N/A';
    } else if (attribute === CAMNPAIGNS_ATTRIBUTES?.campaignOwner) {
      return (
        <Tooltip
          title={
            <React.Fragment>
              <Typography
                sx={{ textAlign: 'center', fontSize: '12px', fontWeight: 500 }}
              >
                {userName}
              </Typography>
              <Typography
                sx={{ textAlign: 'center', fontSize: '12px', fontWeight: 500 }}
              >
                {userEmail}
              </Typography>
            </React.Fragment>
          }
          arrow
          placement="top-start"
        >
          <Box>
            <Typography variant="body3" sx={{ cursor: 'default' }}>
              {capitalizeFirstLetters(userName)}
            </Typography>
          </Box>
        </Tooltip>
      );
    } else if (attribute === CAMNPAIGNS_ATTRIBUTES?.campaignbudget) {
      return info?.row?.original?.campaignBudget
        ? `₤${info?.row?.original?.campaignBudget}`
        : 'N/A';
    } else if (attribute === CAMNPAIGNS_ATTRIBUTES?.campaignGoal) {
      return info?.row?.original?.campaignGoal
        ? info?.row?.original?.campaignGoal
        : 'N/A';
    } else if (attribute === CAMNPAIGNS_ATTRIBUTES?.campaignAudience) {
      return info?.row?.original?.campaignAudience
        ? info?.row?.original?.campaignAudience
        : 'N/A';
    } else if (attribute === CAMNPAIGNS_ATTRIBUTES?.campaignStatus) {
      return info?.row?.original?.campaignStatus
        ? capitalizeFirstLetter(info?.row?.original?.campaignStatus)
        : 'N/A';
    } else if (attribute === CAMNPAIGNS_ATTRIBUTES?.description) {
      return (
        <Box
          dangerouslySetInnerHTML={{
            __html: info?.row?.original?.description
              ? info?.row?.original?.description
              : 'N/A',
          }}
        />
      );
    } else if (attribute === CAMNPAIGNS_ATTRIBUTES?.startDate) {
      return (
        dayjs(info?.row?.original?.startDate)?.format(
          DATE_TIME_FORMAT?.DDMMYYY,
        ) ?? 'N/A'
      );
    } else if (attribute === CAMNPAIGNS_ATTRIBUTES?.endDate) {
      return (
        dayjs(info?.row?.original?.endDate)?.format(
          DATE_TIME_FORMAT?.DDMMYYY,
        ) ?? 'N/A'
      );
    } else if (attribute === CAMNPAIGNS_ATTRIBUTES?.title) {
      return info?.row?.original?.title ?? 'N/A';
    } else {
      return info?.row?.original[attribute] ?? 'N/A';
    }
  };

  const checkboxColumn = {
    accessorFn: (row: any) => row?._id,
    id: 'Id',
    cell: (info: any) => {
      const checked = info?.cell?.row?.original;
      return (
        <Checkbox
          color="primary"
          checked={isSelected(checked?._id)}
          name={checked?._id}
          onClick={() => {
            handleRowClick(checked?._id, checked?.status);
          }}
        />
      );
    },
    header: (info: any) => {
      const rows = info?.table?.options?.data;
      return (
        <Checkbox
          color="primary"
          indeterminate={
            selectedRows?.length > 0 && selectedRows?.length < rows?.length
          }
          checked={
            rows?.length > 0 &&
            selectedRows?.length === info?.table?.options?.data?.length
          }
          onChange={(event) => handleSelectAllClick(event, rows)}
        />
      );
    },
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
};
export const rolesValidationSchema = Yup?.object()?.shape({
  roleName: Yup?.string()?.required('Field is Required'),
  product: Yup?.string()?.required('Field is Required'),
  status: Yup?.string()?.required('Field is Required'),
  createdDate: Yup?.date()?.required('Field is Required'),
});

export const rolesDefaultValues = {
  roleName: '',
  product: '',
  status: '',
  createdDate: null,
};

export const rolesFiltersArray = [
  {
    title: 'Role Name',
    componentProps: {
      name: 'roleName',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'CompanyOwner', label: 'Company Owner' },
      { value: 'SuperAdmin', label: 'Super Admin' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    title: 'Product',
    componentProps: {
      name: 'product',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'sales', label: 'Sales' },
      { value: 'services', label: 'Services' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'loyaltyProgram', label: 'Loyalty Program' },
    ],
    component: RHFSelect,
    md: 12,
  },

  {
    title: 'Status',
    componentProps: {
      name: 'status',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
    component: RHFSelect,
    md: 12,
  },

  {
    title: 'Created Date',
    componentProps: {
      name: 'createdDate',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
];

export const addUserSchema = Yup?.object()?.shape({
  roleName: Yup?.string()?.required('Field is Required'),
  productType: Yup?.string()?.required('Field is Required'),
  defaultUser: Yup?.string()?.required('Field is Required'),
  desc: Yup?.string()?.required('Field is Required'),
});

export const addUserDefault = {
  roleName: '',
  productType: '',
  defaultUser: '',
  desc: '',
};

export const addUsersArrayData = [
  {
    title: 'Role Name',
    componentProps: {
      name: 'roleName',
      placeholder: 'Enter Role Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 5,
  },

  {
    title: 'Select Product',
    componentProps: {
      name: 'productType',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'airSale', label: 'Air Sale' },
      { value: 'airMarketer', label: 'Air Marketer' },
      { value: 'airServices', label: 'Air Services' },
      { value: 'orgAdmin', label: 'Org Admin' },
      { value: 'loyalty', label: 'Loyalty' },
    ],
    component: RHFSelect,
    md: 5,
  },

  {
    componentProps: {
      name: 'defaultUser',
      label: 'Default User',
      fullWidth: true,
    },
    component: SwitchBtn,
    md: 5,
  },

  {
    title: 'Description',
    componentProps: {
      name: 'desc',
      placeholder: 'Description',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 5,
  },
];

export const accData = [
  {
    title: 'Dashboard',
    hasSwitch: true,
    content: 'Dashboard content here',
    endIcon: <ExpandMore />,
  },
  {
    title: 'Deals',
    hasSwitch: true,
    content: 'Deals content here',
    endIcon: <ExpandMore />,
  },
];
