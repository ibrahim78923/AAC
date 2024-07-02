import { Checkbox, Chip, LinearProgress, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { capitalizeFirstLetter, errorSnackbar } from '@/utils/api';
import { AIR_SERVICES, DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { ARRAY_INDEX, STATUS_CONTANTS } from '@/constants/strings';

const statusColor = (status: string) => {
  switch (status) {
    case 'published':
      return 'secondary';
    case 'draft':
      return 'default';
    case 'inactive':
      return 'warning';
  }
};
const statusSwitch = (status: string) => {
  switch (status) {
    case 'published':
      return 'Inactive';
    case 'inactive':
      return 'Published';
  }
};
const surveyType: any = {
  customerSupport: 'Customer Support',
  customerSatisfaction: 'Customer Satisfaction',
};
export const customerSupportListColumn = (
  activeCheck: any,
  setActiveCheck: any,
  feedbackTableData: any,
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
                  feedbackTableData?.find(
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
            feedbackTableData?.length
              ? activeCheck?.length === feedbackTableData?.length
              : false
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setActiveCheck([...feedbackTableData])
              : setActiveCheck([]);
          }}
          color="primary"
          name="_id"
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.surveyTitle,
      id: 'surveyTitle',
      isSortable: true,
      header: 'Survey',
      cell: (info: any) => (
        <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
          {info?.getValue()}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <Chip
          color={statusColor(info?.getValue())}
          label={capitalizeFirstLetter(info?.getValue())}
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.surveyType,
      id: 'surveyType',
      isSortable: true,
      header: 'Survey Type',
      cell: (info: any) => surveyType[info?.getValue()],
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Creation Date',
      cell: (info: any) =>
        dayjs(info?.getValue())?.format(
          `${DATE_TIME_FORMAT?.MMMDDYYYY}, ${TIME_FORMAT?.UI}`,
        ),
    },
  ];
};
export const feedbackDropdown = (
  activeCheck: any,
  setOpenModal: any,
  router: any,
  handleCloneSurvey: any,
  cloneLoading: any,
  handleStatus: any,
  patchLoading: any,
) => {
  const dropdownData: any = [
    {
      id: 2,
      title: cloneLoading ? <LinearProgress sx={{ width: '70px' }} /> : 'Clone',
      handleClick: (closeMenu: any) => {
        if (activeCheck?.length > 1) {
          errorSnackbar('Please select only one survey to clone');
          closeMenu?.();
          return;
        }
        handleCloneSurvey(closeMenu);
      },
      disabled: cloneLoading || patchLoading,
    },
    {
      id: 3,
      title: 'Edit Survey',
      handleClick: (closeMenu: any) => {
        if (activeCheck?.length > 1) {
          errorSnackbar('Please select only one survey to edit');
          closeMenu?.();
          return;
        }
        router?.push({
          pathname: AIR_SERVICES?.UPSERT_FEEDBACK_SURVEY,
          query: {
            type: 'customer-support',
            id: activeCheck?.[ARRAY_INDEX?.ZERO]?._id,
          },
        });
        closeMenu?.();
      },
      disabled: cloneLoading || patchLoading,
    },
    {
      id: 4,
      title: 'Delete',
      handleClick: (closeMenu: any) => {
        setOpenModal(true);
        closeMenu?.();
      },
      disabled: cloneLoading || patchLoading,
    },
  ];
  const shouldAddStatusSwitch = activeCheck
    ?.map((item: any) => item?.status)
    ?.includes(STATUS_CONTANTS?.DRAFT?.toLocaleLowerCase());
  if (!shouldAddStatusSwitch) {
    dropdownData?.unshift({
      id: 1,
      title: patchLoading ? (
        <LinearProgress sx={{ width: '70px' }} />
      ) : (
        statusSwitch(activeCheck?.[ARRAY_INDEX?.ZERO]?.status)
      ),
      handleClick: (closeMenu: any) => {
        if (activeCheck?.length > 1) {
          errorSnackbar('Please select only one to change status');
          closeMenu?.();
          return;
        }
        handleStatus(
          closeMenu,
          statusSwitch(activeCheck?.[ARRAY_INDEX?.ZERO]?.status),
        );
      },
      disabled: cloneLoading || patchLoading,
    });
  }
  return dropdownData;
};
