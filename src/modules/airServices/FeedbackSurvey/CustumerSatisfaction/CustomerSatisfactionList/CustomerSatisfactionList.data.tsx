import { NextRouter } from 'next/router';
import { Box, Checkbox, Chip, LinearProgress, Theme } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { AntSwitch } from '@/components/AntSwitch';
import { capitalizeFirstLetter, errorSnackbar } from '@/utils/api';
import dayjs from 'dayjs';
import { AIR_SERVICES, DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants';
import { ARRAY_INDEX, FEEDBACK_STATUS } from '@/constants/strings';
import { AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS } from '@/constants/permission-keys';
import { FeedbackSurveyListI } from '@/types/modules/AirServices/FeedbackSurvey';
import { TruncateText } from '@/components/TruncateText';

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
  handleDefaultSurvey: (data: FeedbackSurveyListI) => void,
  patchLoading: boolean,
  defaultLoading: { [key: string]: boolean },
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
            !!activeCheck?.find((item) => item?._id === info?.getValue())
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
        <Box display="flex" alignItems="center">
          <AntSwitch
            checked={info?.row?.original?.isDefault}
            onClick={() => handleDefaultSurvey(info?.row?.original)}
            isLoading={defaultLoading?.[info?.row?.original?._id]}
            disabled={
              patchLoading ||
              info?.row?.original?.status !== FEEDBACK_STATUS?.PUBLISHED ||
              info?.row?.original?.isDefault
            }
          />
          &nbsp;&nbsp;&nbsp;
          <TruncateText
            boxProps={{
              sx: { cursor: 'pointer', color: 'primary.main' },
              onClick: () => handleTitleClick(info?.row?.original),
            }}
            customTooltipProps={{ placement: 'top-start' }}
            size={25}
            text={info?.getValue()}
          />
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
          sx={{ color: statusTextColor(info?.getValue()) }}
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
  activeCheck: FeedbackSurveyListI[],
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  router: NextRouter,
  handleCloneSurvey: (closeMenu: () => void) => Promise<void>,
  cloneLoading: boolean,
  handleStatus: (closeMenu: () => void) => Promise<void>,
  statusLoading: boolean,
) => {
  const shouldAddStatusSwitch = activeCheck?.map((item) => item?.status);
  const dropdownData = [
    {
      id: 1,
      title: cloneLoading ? <LinearProgress sx={{ width: '70px' }} /> : 'Clone',
      handleClick: (closeMenu: () => void) => {
        if (activeCheck?.length > 1) {
          errorSnackbar('Please select only one survey to clone');
          closeMenu?.();
          return;
        }
        handleCloneSurvey(closeMenu);
      },
      disabled: cloneLoading || statusLoading,
      permissionKey: [
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SATISFACTION_SURVEY_CLONE,
      ],
    },
    {
      id: 3,
      title: 'Delete',
      handleClick: (closeMenu: () => void) => {
        setOpenModal(true);
        closeMenu?.();
      },
      disabled: cloneLoading || statusLoading,
      permissionKey: [
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SATISFACTION_SURVEY_DELETE,
      ],
    },
  ];
  if (!!shouldAddStatusSwitch?.includes(FEEDBACK_STATUS?.PUBLISHED)) {
    dropdownData?.unshift({
      id: 4,
      title: statusLoading ? (
        <LinearProgress sx={{ width: '70px' }} />
      ) : (
        'Draft'
      ),
      handleClick: (closeMenu: () => void) => {
        if (activeCheck?.length > 1) {
          errorSnackbar('Please select only one to change status');
          closeMenu?.();
          return;
        }
        handleStatus(closeMenu);
      },
      disabled: cloneLoading || statusLoading,
      permissionKey: [
        AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SATISFACTION_SURVEY_EDIT,
      ],
    });
  }
  if (!shouldAddStatusSwitch?.includes(FEEDBACK_STATUS?.PUBLISHED)) {
    dropdownData?.splice(1, 0, {
      id: 2,
      title: 'Edit Survey',
      handleClick: (closeMenu: () => void) => {
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
export const surveyEmailHtml = ({
  sessionData,
  theme,
  magicLink,
  surveyTitle,
}: {
  theme: Theme;
  magicLink?: string;
  surveyTitle: string;
  sessionData: { user: { organization: { name: string } } };
}) =>
  `<p><b>Dear Valued Contributor,</b></p>
<p>I hope this message finds you well. We would like to invite you to participate in an anonymous survey for the ${surveyTitle}.</p>
<p>The purpose of this survey is to help our management team better understand your work experience. Your participation is completely private, and your answers will remain confidential.</p>
<p>To fill out the survey, please visit the following link:<br>
<a href="${magicLink}" style="text-decoration: underline; color: ${theme?.palette?.blue?.link_blue}" target="_blank">${surveyTitle}</a></p><br/>
<p>Thank you in advance for your valuable feedback.</p><br/>
<p>Regards,<br/><br><b>${sessionData?.user?.organization?.name}</b></p>
`;
