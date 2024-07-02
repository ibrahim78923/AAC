import { Box, Button, DialogActions, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { RHFTextField } from '@/components/ReactHookForm';
import { useCreateFeedback } from './useCreateFeedback';
import { sectionDropdownOptions } from './CreateFeedback.data';
import { Questions } from './Questions';
import { LoadingButton } from '@mui/lab';
import { EyeIcon } from '@/assets/icons';

export const CreateFeedback = (props: any) => {
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
                disabled={sectionCondition}
              />
              <RHFTextField
                name={`sections.${index}.description`}
                label="Description"
                size="small"
                multiline
                minRows={3}
                placeholder="Description"
                disabled={sectionCondition}
              />
            </Box>
            <Questions
              sectionIndex={index}
              sectionAppend={append}
              isSection={isSection}
              {...props}
            />
            <br />
          </Box>
        );
      })}
      <DialogActions disableSpacing>
        <LoadingButton
          variant="outlined"
          color="secondary"
          startIcon={<EyeIcon />}
        >
          Preview
        </LoadingButton>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setCreateSurvey(false)}
        >
          Back
        </Button>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </DialogActions>
    </>
  );
};
