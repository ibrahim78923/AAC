import { Box, Typography } from '@mui/material';
import { useText } from './useText';
import { Editor } from 'draft-js';
import { TextI } from './Text.interface';

export const Text = (props: TextI) => {
  const { editorState, setEditorState } = props;
  const { handleKeyCommand, styleMap } = useText(props);

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
            onChange={setEditorState}
            customStyleMap={styleMap}
          />
        </Box>
      </Box>
    </>
  );
};
