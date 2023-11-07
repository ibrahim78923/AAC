import React, { useState } from 'react';
import { Typography, Button, Box, Grid } from '@mui/material';
import Search from '@/components/Search';
import { PlusSharedIconColor } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { conversationAddArticleData } from '../Conversation.data';
import { useTheme } from '@emotion/react';

const ConversationAddArticle = ({ onAddContractButtonClick }) => {
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredContent = conversationAddArticleData?.filter(
    (item) => item?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
  );

  const handleAddContractClick = (title) => {
    onAddContractButtonClick(title);
  };

  return (
    <Grid padding={'20px'}>
      <Box width={{ md: '528px', xs: '280px' }} marginBottom={'15px'}>
        <Search
          value={searchTerm}
          onChange={(event) => setSearchTerm(event?.target?.value)}
          label="Search By Name"
          fullWidth
          size="small"
        />
      </Box>

      <Box>
        <Box display={'flex'} alignItems="center" cursor={'pointer'}>
          <PlusSharedIconColor color={theme?.palette?.primary?.main} />
          <Typography marginLeft={1}>Add New Article</Typography>
        </Box>

        <br />
        {filteredContent?.map((item) => (
          <Box
            marginTop={2}
            key={uuidv4()}
            border={`1px solid ${theme?.palette?.grey[700]}`}
            borderRadius={2}
            padding={1}
          >
            <Typography>{item.title}</Typography>
            <Box display="flex" alignItems="center" marginTop={1}>
              <Typography marginRight={'8px'}>{item?.link}</Typography>

              <Button onClick={() => handleAddContractClick(item?.title)}>
                ADD Content
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
      <br />
    </Grid>
  );
};

export default ConversationAddArticle;
