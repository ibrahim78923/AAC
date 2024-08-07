import { Box, Button, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { RHFTextField } from '@/components/ReactHookForm';
import { useCreateFeedback } from './useCreateFeedback';
import {
  feedbackSubmitDropdown,
  feedbackValuesType,
  sectionDropdownOptions,
} from './CreateFeedback.data';
import { Questions } from './Questions';
import { LoadingButton } from '@mui/lab';
import { EyeIcon } from '@/assets/icons';
import { CreateFeedbackI } from './CreateFeedback.interface';

export const CreateFeedback: React.FC<CreateFeedbackI> = (props) => {
  const { setCreateSurvey, unSaveSection, sectionVerification, methods } =
    props;
  const {
    fields,
    append,
    isSection,
    setIsSection,
    removeSection,
    cloneSection,
    mergeSection,
    deleteLoading,
    mergeLoading,
    cloneLoading,
    handlePublish,
    handleSaveDraft,
    updateLoading,
    emailLoading,
    isStatus,
  } = useCreateFeedback(props);
  return (
    <>
      {fields?.map((section: any, index: number) => {
        const sectionCondition =
          !sectionVerification &&
          methods?.watch(`sections.${index}.id`) !== unSaveSection?.section?.id;
        return (
          <Box
            key={section?.id}
            onMouseEnter={() => setIsSection(index)}
            sx={{ opacity: sectionCondition ? 0.7 : 1 }}
          >
            <Box
              px={2}
              py={1}
              sx={{
                borderTop: 4,
                borderRight: 1,
                borderBottom: 1,
                borderLeft: 1,
                borderTopColor: 'primary.main',
                borderRightColor: 'grey.700',
                borderBottomColor: 'grey.700',
                borderLeftColor: 'grey.700',
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography variant="h4" color="custom.main">
                  Section {index + 1}
                </Typography>
                <SingleDropdownButton
                  dropdownOptions={sectionDropdownOptions({
                    fields,
                    cloneSection,
                    removeSection,
                    mergeSection,
                    index,
                    sectionCondition,
                    deleteLoading,
                    mergeLoading,
                    cloneLoading,
                  })}
                  hasEndIcon={false}
                  dropdownName={<MoreVert />}
                />
              </Box>
              <RHFTextField
                name={`sections.${index}.heading`}
                label="Title"
                size="small"
                placeholder="Title"
                required
                disabled={sectionCondition}
              />
              <RHFTextField
                name={`sections.${index}.description`}
                label="Description"
                size="small"
                multiline
                required
                minRows={3}
                placeholder="Description"
                disabled={sectionCondition}
              />
            </Box>
            <Questions
              sectionIndex={index}
              sectionAppend={append}
              isSection={isSection}
              sectionCondition={sectionCondition}
              {...props}
            />
            <br />
          </Box>
        );
      })}
      <Box
        display="flex"
        justifyContent={{ sm: 'flex-end', xs: 'center' }}
        gap={1}
        flexWrap="wrap"
      >
        <LoadingButton
          variant="outlined"
          color="secondary"
          startIcon={<EyeIcon />}
          onClick={() => setCreateSurvey(feedbackValuesType?.preview)}
          disabled={!sectionVerification}
        >
          Preview
        </LoadingButton>
        <Button
          variant="outlined"
          color="secondary"
          disabled={!sectionVerification}
          onClick={() => setCreateSurvey(feedbackValuesType?.survey)}
        >
          Back
        </Button>
        <SingleDropdownButton
          btnVariant="contained"
          dropdownName="Submit"
          color="primary"
          disabled={!sectionVerification}
          dropdownOptions={feedbackSubmitDropdown({
            handlePublish,
            handleSaveDraft,
            updateLoading,
            emailLoading,
            isStatus,
          })}
        />
      </Box>
    </>
  );
};
