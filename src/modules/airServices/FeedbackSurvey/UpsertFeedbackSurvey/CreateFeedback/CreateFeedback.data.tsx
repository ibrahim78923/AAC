import { Permissions } from '@/constants/permissions';
import { Theme } from '@mui/material';
import {
  FeedbackDropdownI,
  SectionDropdownI,
} from './CreateFeedback.interface';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';
import { pxToRem } from '@/utils/getFontValue';

export const feedbackValuesType = {
  survey: 'survey',
  preview: 'preview',
  draft: 'draft',
  published: 'published',
  viaEmail: 'viaEmail',
  viaMagicLink: 'viaMagicLink',
};
export const sectionDropdownOptions = ({
  fields,
  cloneSection,
  removeSection,
  mergeSection,
  index,
  sectionCondition,
  deleteLoading,
  mergeLoading,
  cloneLoading,
  sectionVerification,
}: SectionDropdownI) => [
  {
    id: 1,
    title: !cloneLoading ? (
      <CustomLinearProgress width={pxToRem(120)} />
    ) : (
      'Clone Section'
    ),
    handleClick: (setClose: () => void) => {
      cloneSection(index, setClose);
    },
    permissionKey: Permissions?.AIR_SERVICES_UPSERT_FEEDBACK_SURVEY,
    disabled:
      sectionCondition ||
      deleteLoading ||
      mergeLoading ||
      cloneLoading ||
      !sectionVerification,
  },
  {
    id: 2,
    title: deleteLoading ? (
      <CustomLinearProgress width={pxToRem(120)} />
    ) : (
      'Delete Section'
    ),
    handleClick: (setClose: () => void) => {
      removeSection(index, setClose);
    },
    permissionKey: Permissions?.AIR_SERVICES_UPSERT_FEEDBACK_SURVEY,
    disabled:
      fields?.length <= 1 ||
      sectionCondition ||
      mergeLoading ||
      cloneLoading ||
      deleteLoading,
  },
  {
    id: 3,
    title: mergeLoading ? (
      <CustomLinearProgress width={pxToRem(120)} />
    ) : (
      'Merge with above'
    ),
    handleClick: (setClose: () => void) => {
      mergeSection(index, setClose);
    },
    permissionKey: Permissions?.AIR_SERVICES_UPSERT_FEEDBACK_SURVEY,
    disabled:
      index === 0 ||
      sectionCondition ||
      deleteLoading ||
      cloneLoading ||
      mergeLoading ||
      !sectionVerification,
  },
];
export const feedbackSubmitDropdown = ({
  handlePublish,
  handleSaveDraft,
  updateLoading,
  emailLoading,
  isStatus,
}: FeedbackDropdownI) => [
  {
    id: 1,
    title:
      (updateLoading || emailLoading) && isStatus ? (
        <CustomLinearProgress width={pxToRem(120)} />
      ) : (
        'Publish'
      ),
    handleClick: (handleClose: () => void) => {
      handlePublish(handleClose);
    },
    disabled: updateLoading || emailLoading,
    permissionKey: Permissions?.AIR_SERVICES_UPSERT_FEEDBACK_SURVEY,
  },
  {
    id: 2,
    title:
      updateLoading && !isStatus ? (
        <CustomLinearProgress width={pxToRem(120)} />
      ) : (
        'Save as Draft'
      ),
    handleClick: (handleClose: () => void) => {
      handleSaveDraft(handleClose);
    },
    disabled: updateLoading || emailLoading,
    permissionKey: Permissions?.AIR_SERVICES_UPSERT_FEEDBACK_SURVEY,
  },
];
export const emailHtml = ({
  sessionData,
  theme,
  uuid,
  surveyTitle,
}: {
  theme: Theme;
  uuid: string;
  surveyTitle: string;
  sessionData: { user: { organization: { name: string } } };
}) =>
  `<p><b>Dear Valued Contributor,</b></p>
<p>I hope this message finds you well. We would like to invite you to participate in an anonymous survey for the ${surveyTitle}.</p>
<p>The purpose of this survey is to help our management team better understand your work experience. Your participation is completely private, and your answers will remain confidential.</p>
<p>To fill out the survey, please visit the following link:<br>
<a href="${window?.location?.origin}/survey/response?surveyId=${uuid}" style="text-decoration: underline; color: ${theme?.palette?.blue?.link_blue}" target="_blank">${surveyTitle}</a></p><br/>
<p>Thank you in advance for your valuable feedback.</p><br/>
<p>Regards,<br/><br><b>${sessionData?.user?.organization?.name}</b></p>
`;
