import { Permissions } from '@/constants/permissions';
import { CircularProgress } from '@mui/material';

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
    disabled: sectionCondition || deleteLoading || mergeLoading,
  },
  {
    id: 2,
    title: deleteLoading ? <CircularProgress size="22px" /> : 'Delete Section',
    handleClick: (setClose: any) => {
      removeSection(index, setClose);
    },
    permissionKey: Permissions?.AIR_SERVICES_UPSERT_FEEDBACK_SURVEY,
    disabled:
      fields?.length <= 1 || sectionCondition || mergeLoading || cloneLoading,
  },
  {
    id: 3,
    title: mergeLoading ? <CircularProgress size="22px" /> : 'Merge with above',
    handleClick: (setClose: any) => {
      mergeSection(index, setClose);
    },
    permissionKey: Permissions?.AIR_SERVICES_UPSERT_FEEDBACK_SURVEY,
    disabled: index === 0 || sectionCondition || deleteLoading || cloneLoading,
  },
];
export const feedbackSubmitDropdown = ({
  handlePublish,
  handleSaveDraft,
  updateLoading,
  isStatus,
}: any) => [
  {
    id: 1,
    title:
      updateLoading && isStatus ? <CircularProgress size="22px" /> : 'Publish',
    handleClick: (handleClose: any) => {
      handlePublish(handleClose);
    },
    disabled: updateLoading,
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
    disabled: updateLoading,
    permissionKey: Permissions?.AIR_SERVICES_UPSERT_FEEDBACK_SURVEY,
  },
];
