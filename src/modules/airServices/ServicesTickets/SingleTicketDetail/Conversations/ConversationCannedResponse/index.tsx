import React, { useState } from 'react';
import { Typography, Button, Box, Grid } from '@mui/material';
import Search from '@/components/Search';
import { PlusSharedIconColor } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { ConversationAddArticleData } from '../Conversation.data';

const ConversationCannedResponse = ({ onAddButtonClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContent = ConversationAddArticleData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddClick = (title) => {
    onAddButtonClick(title);
  };

  return (
    <Grid padding={'20px'}>
      <Box width={{ md: '528px', xs: '280px' }}>
        <Search
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          label="Search By Name"
          fullWidth
          size="small"
          sx={{ marginBottom: '15px' }}
        />
      </Box>

      <Box>
        <Box display={'flex'} alignItems="center">
          <PlusSharedIconColor
            color={'#38CaB5'}
            style={{ cursor: 'pointer' }}
          />
          <Typography sx={{ ml: 1 }}>Add Canned Response</Typography>
        </Box>

        <br />
        {filteredContent.map((item) => (
          <Box
            marginTop={2}
            key={uuidv4()}
            border={`1px solid #E5E7EB`}
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
