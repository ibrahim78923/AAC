import {
  RHFMultiCheckbox,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { AddCircle, Cancel, Edit } from '@mui/icons-material';
import { Box, Button, IconButton } from '@mui/material';
import { useDynamicQuestions } from './useDynamicQuestions';
import {
  dynamicQuestionOptions,
  dynamicQuestionType,
} from './DynamicQuestions.data';
import { DynamicQuestionsI } from './DynamicQuestions.interface';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const DynamicQuestions: React.FC<DynamicQuestionsI> = (props) => {
  const { sectionIndex, questionIndex, watchType, sectionCondition } = props;
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
    <CustomGrid isContainer>
      {isOption && (
        <CustomGrid customStyles={{ display: 'flex', alignItems: 'end' }}>
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
            <IconButton onClick={handleEditOption} disabled={sectionCondition}>
              <Edit color="primary" />
            </IconButton>
          )}
        </CustomGrid>
      )}
      <CustomGrid>
        {!isOption &&
          fields?.map((field, index) => (
            <Box
              key={field?.id}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Box>
                <RHFTextField
                  name={`sections.${sectionIndex}.questions.${questionIndex}.text.${index}.text`}
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
            </Box>
          ))}
      </CustomGrid>
      <CustomGrid customStyles={{ display: 'flex', gap: 1 }}>
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
      </CustomGrid>
    </CustomGrid>
  );
};
