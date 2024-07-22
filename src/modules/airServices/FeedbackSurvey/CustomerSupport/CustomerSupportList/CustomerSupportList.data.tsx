import { Checkbox, Chip, LinearProgress, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { capitalizeFirstLetter, errorSnackbar } from '@/utils/api';
import { AIR_SERVICES, DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { ARRAY_INDEX, FEEDBACK_STATUS } from '@/constants/strings';
import { AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';

export const surveyDataTypes = {
  customerSupport: 'customer-support',
};
const statusColor = (status: string) => {
  switch (status) {
    case FEEDBACK_STATUS?.PUBLISHED:
      return 'secondary';
    case FEEDBACK_STATUS?.DRAFT:
      return 'default';
    case FEEDBACK_STATUS?.INACTIVE:
      return 'warning';
  }
};
const statusSwitch = (status: string) => {
  switch (status) {
    case FEEDBACK_STATUS?.PUBLISHED:
      return 'Inactive';
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
  handleTitleClick: any,
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
        <Typography
          variant="body2"
          color="primary"
          sx={{ cursor: 'pointer' }}
          onClick={() => handleTitleClick(info?.row?.original)}
        >
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
      permissionKey: [
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SUPPORT_SURVEY_CLONE,
      ],
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
      permissionKey: [
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SUPPORT_SURVEY_DELETE,
      ],
    },
  ];
  const shouldAddStatusSwitch = activeCheck?.map((item: any) => item?.status);
  if (
    !shouldAddStatusSwitch?.includes(FEEDBACK_STATUS?.INACTIVE) &&
    !shouldAddStatusSwitch?.includes(FEEDBACK_STATUS?.DRAFT)
  ) {
    dropdownData?.unshift({
      id: 1,
      title: patchLoading ? (
        <LinearProgress sx={{ width: '70px' }} />
      ) : (
        'Inactive'
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
      permissionKey:
        Permissions?.AIR_SERVICES_CUSTOMER_SUPPORT_FEEDBACK_SURVEY_ACTIONS,
    });
  }
  if (
    !shouldAddStatusSwitch?.includes(FEEDBACK_STATUS?.PUBLISHED) &&
    activeCheck?.length <= 1
  ) {
    dropdownData?.splice(1, 0, {
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
      permissionKey: [
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SUPPORT_SURVEY_EDIT,
      ],
      disabled: cloneLoading || patchLoading,
    });
  }
  return dropdownData;
};
