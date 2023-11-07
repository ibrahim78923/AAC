import React, { useState } from 'react';
import { Typography, Button, Box, Grid, useTheme } from '@mui/material';
import Search from '@/components/Search';
import { PlusSharedIconColor } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { conversationAddArticleData } from '../Conversation.data';

const ConversationCannedResponse = ({ onAddButtonClick }) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContent = conversationAddArticleData?.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddClick = (title) => {
    onAddButtonClick(title);
  };

  return (
    <Grid padding={'20px'}>
      <Box width={{ md: '528px', xs: '280px' }} marginBottom={'15px'}>
        <Search
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          label="Search By Name"
          fullWidth
          size="small"
        />
      </Box>

      <Box>
        <Box display={'flex'} alignItems="center" cursor={'pointer'}>
          <PlusSharedIconColor color={theme?.palette?.primary?.main} />
          <Typography marginLeft={1}>Add Canned Response</Typography>
        </Box>

        <br />
        {filteredContent.map((item) => (
          <Box
            marginTop={2}
            key={uuidv4()}
            border={`1px solid ${theme?.palette?.grey[700]}`}
            borderRadius={2}
            padding={1}
          >
            <Typography>{item.title}</Typography>
            <Button onClick={() => handleAddClick(item.title)}>ADD</Button>
          </Box>
        ))}
      </Box>
    </Grid>
  );
};

export default ConversationCannedResponse;
