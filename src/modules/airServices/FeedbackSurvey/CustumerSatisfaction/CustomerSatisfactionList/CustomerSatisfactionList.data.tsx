import {
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  Typography,
} from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { AntSwitch } from '@/components/AntSwitch';
import { capitalizeFirstLetter, errorSnackbar } from '@/utils/api';
import dayjs from 'dayjs';
import { AIR_SERVICES, DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants';
import { ARRAY_INDEX, FEEDBACK_STATUS } from '@/constants/strings';
import { AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS } from '@/constants/permission-keys';

const statusColor = (status: string) => {
  switch (status) {
    case 'published':
      return 'secondary';
    case 'draft':
      return 'default';
  }
};
const surveyType: any = {
  customerSupport: 'Customer Support',
  customerSatisfaction: 'Customer Satisfaction',
};
export const surveyDataTypes = {
  draft: 'draft',
  customerSatisfaction: 'customer-satisfaction',
};
export const customerSupportListColumn = (
  activeCheck: any,
  setActiveCheck: any,
  feedbackTableData: any,
  handleTitleClick: any,
  handleDefaultSurvey: any,
  patchLoading: any,
  defaultLoading: any,
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
        <Box display="flex" alignItems="center">
          <AntSwitch
            checked={info?.row?.original?.isDefault}
            onClick={() => handleDefaultSurvey(info?.row?.original)}
            isLoading={defaultLoading?.[info?.row?.original?._id]}
            disabled={
              patchLoading ||
              info?.row?.original?.status === surveyDataTypes?.draft ||
              info?.row?.original?.isDefault
            }
          />
          &nbsp;&nbsp;&nbsp;
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: 'pointer' }}
            onClick={() => handleTitleClick(info?.row?.original)}
          >
            {info?.getValue()}
          </Typography>
        </Box>
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
) => {
  const shouldAddStatusSwitch = activeCheck?.map((item: any) => item?.status);
  const dropdownData = [
    {
      id: 1,
      title: cloneLoading ? <CircularProgress size="22px" /> : 'Clone',
      handleClick: (closeMenu: any) => {
        if (activeCheck?.length > 1) {
          errorSnackbar('Please select only one survey to clone');
          closeMenu?.();
          return;
        }
        handleCloneSurvey(closeMenu);
      },
      disabled: cloneLoading,
      permissionKey: [
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SATISFACTION_SURVEY_CLONE,
      ],
    },
    {
      id: 3,
      title: 'Delete',
      handleClick: (closeMenu: any) => {
        setOpenModal(true);
        closeMenu?.();
      },
      disabled: cloneLoading,
      permissionKey: [
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SATISFACTION_SURVEY_DELETE,
      ],
    },
  ];
  if (!shouldAddStatusSwitch?.includes(FEEDBACK_STATUS?.PUBLISHED)) {
    dropdownData?.splice(1, 0, {
      id: 2,
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
            type: 'customer-satisfaction',
            id: activeCheck?.[ARRAY_INDEX?.ZERO]?._id,
          },
        });
        closeMenu?.();
      },
      disabled: cloneLoading,
      permissionKey: [
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SATISFACTION_SURVEY_EDIT,
      ],
    });
  }
  return dropdownData;
};
