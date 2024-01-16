import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography } from '@mui/material';
import Search from '@/components/Search';
import { useKnowledgeBaseDetail } from './useKnowledgeBaseDetail';
import { KnowledgeBaseTicket } from './KnowledgeBaseTicket';
import { knowledgeBaseTicketDataArray } from './KnowledgeBaseDetail.data';
import CustomPagination from '@/components/CustomPagination';

export const KnowledgeBaseDetail = () => {
  const { handleKnowledgeBase, searchValue, SetSearchValue, theme } =
    useKnowledgeBaseDetail();

  return (
    <Box
      border={`.1rem solid ${theme?.palette?.grey?.[700]}`}
      p={2}
      borderRadius={2}
    >
      <Box
        display={'flex'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        gap={1}
        sx={{ cursor: 'pointer' }}
      >
        <ArrowBackIcon onClick={() => handleKnowledgeBase()} />
        <Typography variant="h4">Knowledge Base - Training</Typography>
      </Box>
      <Box mt={2} mb={4}>
        <Search
          label="Search Here"
          searchBy={searchValue}
          setSearchBy={SetSearchValue}
        />
      </Box>
      {knowledgeBaseTicketDataArray?.map((item: any) => (
        <KnowledgeBaseTicket
          key={item?.id}
          policy={item?.policy}
          modifiedDate={item?.modifiedDate}
          purposeDescription={item?.purposeDescription}
        />
      ))}
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </Box>
  );
};
