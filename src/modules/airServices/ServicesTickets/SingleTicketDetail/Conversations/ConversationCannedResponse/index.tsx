import { Typography, Button, Box, Grid } from '@mui/material';
import Search from '@/components/Search';
import { PlusSharedIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { UseConversation } from '../useConversation';

const ConversationCannedResponse = ({ onAddButtonClick }: any) => {
  const { theme, searchTerm, setSearchTerm, filteredContent } =
    UseConversation();

  const handleAddClick = (title: any) => {
    onAddButtonClick(title);
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
        <Box display={'flex'} alignItems="center" sx={{ cursor: 'pointer' }}>
          <PlusSharedIcon />
          <Typography marginLeft={1}>Add Canned Response</Typography>
        </Box>

        <br />
        {filteredContent?.map((item: any) => (
          <Box
            marginTop={2}
            key={uuidv4()}
            border={`.1rem solid ${theme?.palette?.grey[700]}`}
            borderRadius={2}
            padding={1}
          >
            <Typography>{item?.title}</Typography>
            <Button onClick={() => handleAddClick(item?.title)}>ADD</Button>
          </Box>
        ))}
      </Box>
    </Grid>
  );
};

export default ConversationCannedResponse;
