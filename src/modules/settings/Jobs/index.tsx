import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CommonDrawer from '@/components/CommonDrawer';
import TextEditor from '@/components/TextEditor';

const Jobs = () => {
  const [isJobPostingDrawer, setIsJobPostingDrawer] = useState(false);
  const [editorValue, setEditorValue] = useState<string>('');

  const handelPostJob = () => {};

  return (
    <Box
      sx={{
        borderRadius: '15px',
        border: '1px solid #EAECF0',
        padding: '16px 24px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: '600' }}>
          Jobs
        </Typography>
        <Button
          sx={{
            backgroundColor: '#38CAB5',
            color: '#fff',
            width: '127px',
            height: '36px',
            borderRadius: '4px',
            textTransform: 'none',
          }}
          onClick={() => setIsJobPostingDrawer(true)}
        >
          Post a Job
        </Button>
      </Box>

      <Box>Common table</Box>
      <CommonDrawer
        isDrawerOpen={isJobPostingDrawer}
        setIsDrawerOpen={setIsJobPostingDrawer}
        title="Post a Job"
        okText="Post"
        isOk={false}
        submitHandler={handelPostJob}
      >
        <span>dummy text</span>
        <br />
        <TextEditor value={editorValue} onChange={setEditorValue} />
      </CommonDrawer>
    </Box>
  );
};
export default Jobs;
