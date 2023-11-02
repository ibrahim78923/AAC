import { PlusSharedIconColor } from '@/assets/icons';
import Search from '@/components/Search';
import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ConversationAddArticalData } from '../Conversation.data';
import { v4 as uuidv4 } from 'uuid';

const ConversationAddArtical = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContent = ConversationAddArticalData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
          <Typography sx={{ ml: 1 }}>Add New Article</Typography>
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
            <Box
              display="flex"
              alignItems="center"
              marginTop={1}
              fontSize={'10px'}
            >
              <Typography>{item.link}</Typography>
              <Button sx={{ ml: 2 }}>ADD Content</Button>
            </Box>
          </Box>
        ))}
      </Box>
      <br />
    </Grid>
  );
};

export default ConversationAddArtical;
