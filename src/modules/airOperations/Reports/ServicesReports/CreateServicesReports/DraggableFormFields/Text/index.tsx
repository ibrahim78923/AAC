import { Box, Typography } from '@mui/material';
import { useText } from './useText';
import { Editor } from 'draft-js';

export const Text = (props: any) => {
  const { editorState, setEditorState } = props;
  const { handleKeyCommand, styleMap } = useText(props);

  return (
    <>
      <Typography variant={'h6'} mb={2}>
        Description
      </Typography>
      <Box height={'50vh'} overflow={'scroll'}>
        <Box
          border={1}
          borderBottom={'grey.900'}
          p={'0.5rem 2rem'}
          borderRadius={'0.5rem'}
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
