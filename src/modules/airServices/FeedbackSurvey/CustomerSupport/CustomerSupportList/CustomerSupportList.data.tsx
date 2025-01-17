import { NextRouter } from 'next/router';
import { Checkbox } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { capitalizeFirstLetter } from '@/utils/api';
import { DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants';
import { AIR_SERVICES } from '@/constants/routes';
import {
  ARRAY_INDEX,
  FEEDBACK_STATUS,
  FEEDBACK_SURVEY_PATH_TYPES,
  SELECTED_ARRAY_LENGTH,
} from '@/constants/strings';
import { AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';
import { FeedbackSurveyListI } from '@/types/modules/AirServices/FeedbackSurvey';
import { TruncateText } from '@/components/TruncateText';
import { otherDateFormat } from '@/lib/date-time';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';
import { CustomChip } from '@/components/Chip/CustomChip';

const statusColor = (status: string) => {
  switch (status) {
    case FEEDBACK_STATUS?.PUBLISHED:
      return 'secondary';
    case FEEDBACK_STATUS?.DRAFT:
      return 'default';
    case FEEDBACK_STATUS?.INACTIVE:
      return 'warning';
    case FEEDBACK_STATUS?.EXPIRED:
      return 'error';
  }
};
const statusTextColor = (status: string) => {
  switch (status) {
    case FEEDBACK_STATUS?.PUBLISHED:
    case FEEDBACK_STATUS?.EXPIRED:
      return 'common.white';
    default:
      return 'common.black';
  }
};
const surveyType: { [key: string]: string } = {
  customerSupport: 'Customer Support',
  customerSatisfaction: 'Customer Satisfaction',
};
export const customerSupportListColumn = (
  activeCheck: FeedbackSurveyListI[],
  setActiveCheck: React.Dispatch<React.SetStateAction<FeedbackSurveyListI[]>>,
  feedbackTableData: FeedbackSurveyListI[],
  handleTitleClick: (data: FeedbackSurveyListI) => void,
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
          onChange={(e) => {
            if (e?.target?.checked) {
              const foundItem = feedbackTableData?.find(
                (item) => item?._id === info?.getValue(),
              );
              if (foundItem) {
                setActiveCheck([...activeCheck, foundItem]);
              }
            } else {
              setActiveCheck(
                activeCheck?.filter((item) => item?._id !== info?.getValue()),
              );
            }
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
          onChange={(e) => {
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
        <TruncateText
          boxProps={{
            sx: { cursor: 'pointer', color: 'primary.main' },
            onClick: () => handleTitleClick(info?.row?.original),
          }}
          customTooltipProps={{ placement: 'top-start' }}
          size={25}
          text={info?.getValue()}
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <CustomChip
          color={statusColor(info?.getValue())}
          size="medium"
          label={capitalizeFirstLetter(info?.getValue())}
          textColor={statusTextColor(info?.getValue())}
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
        otherDateFormat(
          info?.getValue(),
          `${DATE_TIME_FORMAT?.MMMDDYYYY}, ${TIME_FORMAT?.UI}`,
        ),
    },
  ];
};
export const feedbackDropdown = (
  activeCheck: FeedbackSurveyListI[],
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  router: NextRouter,
  handleCloneSurvey: (closeMenu: () => void) => Promise<void>,
  cloneLoading: boolean,
  handleStatus: (closeMenu: () => void) => Promise<void>,
  statusLoading: boolean,
  handleCopy: (surveyLink?: string) => void,
) => {
  const dropdownData = [
    {
      id: 2,
      title: cloneLoading ? <CustomLinearProgress /> : 'Clone',
      handleClick: (closeMenu: () => void) => {
        handleCloneSurvey(closeMenu);
      },
      permissionKey: [
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SUPPORT_SURVEY_CLONE,
      ],
      disabled:
        cloneLoading ||
        statusLoading ||
        activeCheck?.length > SELECTED_ARRAY_LENGTH?.ONE,
    },
    {
      id: 4,
      title: 'Delete',
      handleClick: (closeMenu: () => void) => {
        setOpenModal(true);
        closeMenu?.();
      },
      disabled: cloneLoading || statusLoading,
      permissionKey: [
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SUPPORT_SURVEY_DELETE,
      ],
    },
  ];
  const shouldAddStatusSwitch = activeCheck?.map((item) => item?.status);
  if (!!shouldAddStatusSwitch?.includes(FEEDBACK_STATUS?.PUBLISHED)) {
    dropdownData?.unshift({
      id: 1,
      title: statusLoading ? <CustomLinearProgress /> : 'Inactive',
      handleClick: (closeMenu: () => void) => {
        handleStatus(closeMenu);
      },
      disabled:
        cloneLoading ||
        statusLoading ||
        activeCheck?.length > SELECTED_ARRAY_LENGTH?.ONE,
      permissionKey:
        Permissions?.AIR_SERVICES_CUSTOMER_SUPPORT_FEEDBACK_SURVEY_ACTIONS,
    });
  }
  if (shouldAddStatusSwitch?.includes(FEEDBACK_STATUS?.PUBLISHED)) {
    dropdownData?.unshift({
      id: 5,
      title: 'Copy Survey Link',
      handleClick: (closeMenu: () => void) => {
        handleCopy(activeCheck?.[ARRAY_INDEX?.ZERO]?.magicLink);
        closeMenu?.();
      },
      disabled:
        cloneLoading ||
        statusLoading ||
        activeCheck?.length > SELECTED_ARRAY_LENGTH?.ONE,
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
      handleClick: (closeMenu: () => void) => {
        router?.push({
          pathname: AIR_SERVICES?.UPSERT_FEEDBACK_SURVEY,
          query: {
            type: FEEDBACK_SURVEY_PATH_TYPES?.CUSTOMER_SUPPORT,
            id: activeCheck?.[ARRAY_INDEX?.ZERO]?._id,
          },
        });
        closeMenu?.();
      },
      permissionKey: [
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SUPPORT_SURVEY_EDIT,
      ],
      disabled:
        cloneLoading ||
        statusLoading ||
        activeCheck?.length > SELECTED_ARRAY_LENGTH?.ONE,
    });
  }
  return dropdownData;
};
