import { Box, InputAdornment, Typography } from '@mui/material';
import { useText } from './useText';
import { Editor } from 'draft-js';
import { RHFTextField } from '@/components/ReactHookForm';
import { CheckBox } from '@mui/icons-material';
import { EditInputIcon } from '@/assets/icons';

export const Text = (props: any) => {
  const { editorState, setEditorState, textTitle, setValue } = props;
  const { handleKeyCommand, styleMap, setEditValue, editValue, setEdit, edit } =
    useText(props);

  return (
    <>
      <Typography variant={'h6'}>Title</Typography>
      <RHFTextField
        name={'textTitle'}
        size="small"
        disabled={edit}
        sx={{
          width: '40%',
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
              {edit ? (
                <Box
                  onClick={() => {
                    setEdit(false), setValue === editValue;
                  }}
                >
                  <EditInputIcon />
                </Box>
              ) : (
                <Box
                  onClick={() => {
                    setEdit(true), setEditValue(textTitle);
                  }}
                >
                  <CheckBox />
                </Box>
              )}
            </InputAdornment>
          ),
        }}
      />
      <Typography variant={'h6'}>Description</Typography>
      <Box height={'50vh'} overflow={'scroll'} pb={1}>
        <Box
          border={1}
          borderColor={'grey.900'}
          p={'0.5rem 1.4rem'}
          borderRadius={1}
        >
          <Editor
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={setEditorState}
            customStyleMap={styleMap}
          />
        </Box>
      </Box>
    </>
  );
};
