import { Typography, Button, Box, Grid } from '@mui/material';
import Search from '@/components/Search';
import { PlusSharedIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { useConversation } from '../useConversation';

const ConversationAddArticle = ({ onAddContractButtonClick }: any) => {
  const { theme, filteredContent, searchTerm, setSearchTerm } =
    useConversation();

  const handleAddContractClick = (title: any) => {
    onAddContractButtonClick(title);
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
          <Typography marginLeft={1}>Add New Article</Typography>
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
              <Typography marginRight={'.50rem'}>{item?.link}</Typography>

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
