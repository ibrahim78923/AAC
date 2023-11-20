// ConversationSelectModal.jsx
import React from 'react';
import { Typography, Button, Box, Grid } from '@mui/material';
import Search from '@/components/Search';
import { v4 as uuidv4 } from 'uuid';
import PlusSharedIconColor from '@/assets/icons/shared/plus-shared-color';

const ConversationSelectModal = ({
  theme,
  onAddButtonClick,
  filteredContent,
  searchTerm,
  setSearchTerm,
  title,
}) => {
  const handleAddClick = (selectedTitle) => {
    onAddButtonClick(selectedTitle);
  };

  return (
    <Grid padding={'1.2rem'}>
      <Box width={{ md: 528, xs: 260 }} marginBottom={'1rem'}>
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
          <Typography marginLeft={1}>{title}</Typography>
        </Box>

        <br />
        {filteredContent?.map((item) => (
          <Box
            marginTop={2}
            key={uuidv4()}
            border={`.1rem solid ${theme?.palette?.grey[700]}`}
            borderRadius={2}
            padding={1}
          >
            <Typography>{item?.title}</Typography>
            <Box display="flex" alignItems="center" marginTop={1}>
              {title === 'Add New Article' && (
                <Typography marginRight={'.50rem'}>{item?.link}</Typography>
              )}
              <Button onClick={() => handleAddClick(item?.title)}>
                {title === 'Add Canned Response' ? 'ADD' : 'ADD Content'}
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
      <br />
    </Grid>
  );
};

export default ConversationSelectModal;
