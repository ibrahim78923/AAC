import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import 'react-quill/dist/quill.snow.css';
import { ConversationTextEditorPropsI } from './ConversationTextEditor.interface';
import { modules } from '../Conversation.data';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

const ConversationTextEditor = ({
  value,
  onChange,
}: ConversationTextEditorPropsI) => {
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          border: `0.094rem solid ${theme?.palette?.grey?.[900]}`,
          borderRadius: '0.5rem',
          overflow: 'hidden',
          '& .ql-toolbar.ql-snow': {
            backgroundColor: theme?.palette?.grey[100],
            border: 'none',
          },
          '& .ql-container.ql-snow': {
            border: 'none',
            height: '6.875rem',
          },
        }}
      >
        <ReactQuill
          value={value}
          onChange={(newValue) => onChange(newValue)}
          modules={modules}
          style={{ position: 'relative' }}
        />
      </Box>
    </Box>
  );
};

export default ConversationTextEditor;
