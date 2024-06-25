import {
  RHFMultiCheckbox,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { AddCircle, Cancel, Edit } from '@mui/icons-material';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { useDynamicQuestions } from './useDynamicQuestions';
import {
  dynamicQuestionOptions,
  dynamicQuestionType,
} from './DynamicQuestions.data';

export const DynamicQuestions = (props: any) => {
  const { sectionIndex, questionIndex, watchType } = props;
  const {
    isOption,
    fields,
    append,
    watchOptions,
    handleSaveOption,
    handleRemove,
    handleEditOption,
  } = useDynamicQuestions(props);
  return (
    <Grid container>
      {isOption && (
        <Grid item xs={12} display="flex" alignItems="end">
          {watchType?.value === dynamicQuestionType?.multipleChoice && (
            <RHFRadioGroup
              name={`displayOption`}
              options={dynamicQuestionOptions(watchOptions)}
              disabled
            />
          )}
          {watchType?.value === dynamicQuestionType?.checkboxes && (
            <RHFMultiCheckbox
              name={`displayOption`}
              options={dynamicQuestionOptions(watchOptions)}
              disabled
            />
          )}
          {isOption && (
            <IconButton onClick={handleEditOption}>
              <Edit color="primary" />
            </IconButton>
          )}
        </Grid>
      )}
      {!isOption &&
        fields?.map((field, index) => (
          <Grid
            item
            key={field?.id}
            xs={12}
            display={'flex'}
            alignItems={'center'}
            gap={1}
          >
            <Box>
              <RHFTextField
                name={`section.${sectionIndex}.questions.${questionIndex}.text.${index}.text`}
                label={`Option ${index + 1}`}
                placeholder={`${index + 1}`}
                size="small"
                variant="standard"
              />
            </Box>
            <Cancel
              sx={{
                cursor: fields?.length > 1 ? 'pointer' : 'no-drop',
                color: 'error.main',
                mt: 1.5,
              }}
              onClick={() => handleRemove(index)}
            />
          </Grid>
        ))}
      <Box display="flex" gap={1}>
        {!isOption && (
          <>
            <Button
              variant="text"
              onClick={() => append({ text: '' })}
              size="small"
              startIcon={<AddCircle />}
            >
              Add more
            </Button>
            <Button variant="contained" size="small" onClick={handleSaveOption}>
              Save
            </Button>
          </>
        )}
      </Box>
    </Grid>
  );
};
