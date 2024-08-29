import { Box, Typography } from '@mui/material';
import { useText } from './useText';
import { Editor } from 'draft-js';
import { setEditorState } from '@/redux/slices/genericReport/genericReportSlice';

export const Text = () => {
  const { handleKeyCommand, styleMap, editorState, dispatch } = useText();

  return (
    <>
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
            onChange={(newEditorState) =>
              dispatch(setEditorState(newEditorState))
            }
            customStyleMap={styleMap}
          />
        </Box>
      </Box>
    </>
  );
};
