// ConversationSelectModal.jsx
import React from 'react';
import { Typography, Button, Box, Grid } from '@mui/material';
import Search from '@/components/Search';
import { v4 as uuidv4 } from 'uuid';
import PlusSharedIconColor from '@/assets/icons/shared/plus-shared-color';
import { TICKETS_CONVERSATION_MODAL_TYPE } from '@/constants/strings';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';

const ConversationSelectModal = ({
  theme,
  onAddButtonClick,
  filteredContent,
  searchTerm,
  setSearchTerm,
  title,
}: any) => {
  const { push } = useRouter();
  const handleAddClick = (selectedTitle: any) => {
    onAddButtonClick(selectedTitle);
  };

  return (
    <Grid padding={'1.2rem'}>
      <Box width={{ md: 528, xs: 260 }} marginBottom={'0.25rem'}>
        <Search
          value={searchTerm}
          onChange={(event) => setSearchTerm(event?.target?.value)}
          label="Search By Name"
          fullWidth
          size="small"
        />
      </Box>

      <Box>
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => push(AIR_SERVICES?.NEW_PURCHASE_ORDER)}
        >
          <PlusSharedIconColor color={theme?.palette?.primary?.main} />
          <Typography marginLeft={1}>{title}</Typography>
        </Box>

        {filteredContent?.map((item: any) => (
          <Box
            marginTop={2}
            key={uuidv4()}
            border={`.1rem solid ${theme?.palette?.grey[700]}`}
            borderRadius={2}
            padding={1}
          >
            <Typography>{item?.title}</Typography>
            <Box display="flex" alignItems="center" marginTop={1}>
              {title === TICKETS_CONVERSATION_MODAL_TYPE.ARTICLE && (
                <Typography fontSize={12} marginRight={'.50rem'}>
                  {item?.link}
                </Typography>
              )}
              <Button
                variant="outlined"
                size="small"
                sx={{
                  height: 30,
                  background: theme?.palette?.primary?.main + 50,
                  fontSize: 12,
                  fontWeight: 500,
                }}
                onClick={() => handleAddClick(item?.title)}
              >
                {title === TICKETS_CONVERSATION_MODAL_TYPE.CANNED
                  ? 'Add'
                  : 'Add Content'}
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
