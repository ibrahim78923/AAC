import { Permissions } from '@/constants/permissions';
import { CircularProgress, Theme } from '@mui/material';

export const feedbackValuesType = {
  survey: 'survey',
  preview: 'preview',
  draft: 'draft',
  published: 'published',
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
}: any) => [
  {
    id: 1,
    title: cloneLoading ? <CircularProgress size="22px" /> : 'Clone Section',
    handleClick: (setClose: any) => {
      cloneSection(index, setClose);
    },
    permissionKey: Permissions?.AIR_SERVICES_UPSERT_FEEDBACK_SURVEY,
    disabled: sectionCondition || deleteLoading || mergeLoading || cloneLoading,
  },
  {
    id: 2,
    title: deleteLoading ? <CircularProgress size="22px" /> : 'Delete Section',
    handleClick: (setClose: any) => {
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
    title: mergeLoading ? <CircularProgress size="22px" /> : 'Merge with above',
    handleClick: (setClose: any) => {
      mergeSection(index, setClose);
    },
    permissionKey: Permissions?.AIR_SERVICES_UPSERT_FEEDBACK_SURVEY,
    disabled:
      index === 0 ||
      sectionCondition ||
      deleteLoading ||
      cloneLoading ||
      mergeLoading,
  },
];
export const feedbackSubmitDropdown = ({
  handlePublish,
  handleSaveDraft,
  updateLoading,
  emailLoading,
  isStatus,
}: any) => [
  {
    id: 1,
    title:
      (updateLoading || emailLoading) && isStatus ? (
        <CircularProgress size="22px" />
      ) : (
        'Publish'
      ),
    handleClick: (handleClose: any) => {
      handlePublish(handleClose);
    },
    disabled: updateLoading || emailLoading,
    permissionKey: Permissions?.AIR_SERVICES_UPSERT_FEEDBACK_SURVEY,
  },
  {
    id: 2,
    title:
      updateLoading && !isStatus ? (
        <CircularProgress size="22px" />
      ) : (
        'Save as Draft'
      ),
    handleClick: (handleClose: any) => {
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
<p>I hope this message finds you well. We would like to invite you to participate in an anonymous survey for the Learning Workshop 2023.</p>
<p>The purpose of this survey is to help our management team better understand your work experience. Your participation is completely private, and your answers will remain confidential.</p>
<p>To fill out the survey, please visit the following link:<br>
<a href="${window?.location?.origin}/survey/response?surveyId=${uuid}" style="text-decoration: underline; color: ${theme?.palette?.blue?.link_blue}" target="_blank">${surveyTitle}</a></p><br/>
<p>Thank you in advance for your valuable feedback.</p><br/>
<p>Regards,<br/><br><b>${sessionData?.user?.organization?.name}</b></p>
`;
