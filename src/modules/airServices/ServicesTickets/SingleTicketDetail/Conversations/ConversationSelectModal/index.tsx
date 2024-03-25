import React, { useEffect, useState } from 'react';
import { Typography, Button, Box, Grid } from '@mui/material';
import Search from '@/components/Search';
import PlusSharedIconColor from '@/assets/icons/shared/plus-shared-color';
import { TICKETS_CONVERSATION_MODAL_TYPE } from '@/constants/strings';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';

import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import {
  useGetConversationAllArticlesQuery,
  useGetCannedResponsesQuery,
} from '@/services/airServices/tickets/single-ticket-details/conversation';
import { PAGINATION } from '@/config';
import CustomPagination from '@/components/CustomPagination';

const ConversationSelectModal = ({ theme, onAddButtonClick, title }: any) => {
  const { push } = useRouter();
  const [articlesData, setArticlesData] = useState([]);
  const [cannedResponses, setCannedResponses] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [page, setPage] = useState(PAGINATION.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION.PAGE_LIMIT);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const params = {
    page,
    limit,
    search,
  };

  const { data: articlesQueryData, isLoading: articlesLoading } =
    useGetConversationAllArticlesQuery(params);
  const { data: cannedResponsesQueryData, isLoading: cannedResponsesLoading } =
    useGetCannedResponsesQuery(params);

  useEffect(() => {
    setArticlesData(articlesQueryData?.data?.articles || []);
    setCannedResponses(cannedResponsesQueryData?.data?.cannedresponses || []);
    setIsLoading(articlesLoading || cannedResponsesLoading);
  }, [
    articlesQueryData,
    cannedResponsesQueryData,
    articlesLoading,
    cannedResponsesLoading,
  ]);

  useEffect(() => {
    if (title === TICKETS_CONVERSATION_MODAL_TYPE?.ARTICLE) {
      setFilteredContent(articlesData);
    } else if (title === TICKETS_CONVERSATION_MODAL_TYPE?.CANNED) {
      setFilteredContent(cannedResponses);
    }
  }, [title, articlesData, cannedResponses]);

  const currentMetaData =
    title === TICKETS_CONVERSATION_MODAL_TYPE?.ARTICLE
      ? articlesQueryData?.data?.meta
      : cannedResponsesQueryData?.data?.meta;

  const navigationHandler = () => {
    if (title === TICKETS_CONVERSATION_MODAL_TYPE?.CANNED) {
      push(AIR_SERVICES?.NEW_PURCHASE_ORDER);
    } else if (title === TICKETS_CONVERSATION_MODAL_TYPE?.ARTICLE) {
      push(AIR_SERVICES?.KNOWLEDGE_BASE);
    }
  };

  return (
    <Grid padding={'1.2rem'}>
      <Box width={{ md: 528, xs: 260 }} marginBottom={'0.25rem'}>
        <Search
          value={search}
          onChange={(event) => setSearch(event?.target?.value)}
          label="Search By Name"
          fullWidth
          size="small"
        />
      </Box>

      <Box>
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={navigationHandler}
        >
          <PlusSharedIconColor color={theme?.palette?.primary?.main} />
          <Typography marginLeft={1}>{title}</Typography>
        </Box>

        {isLoading ? (
          <SkeletonTable />
        ) : (
          filteredContent?.map((item: any) => (
            <Box
              marginTop={2}
              key={item?._id}
              border={`.1rem solid ${theme?.palette?.grey[700]}`}
              borderRadius={2}
              padding={1}
            >
              <Typography
                dangerouslySetInnerHTML={{
                  __html: item?.description || item?.details,
                }}
              />
              <Box display="flex" alignItems="center" marginTop={1}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    height: 30,
                    background: `${theme?.palette?.primary?.main}50`,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                  onClick={() => onAddButtonClick(item)}
                >
                  Add
                </Button>
              </Box>
            </Box>
          ))
        )}

        <CustomPagination
          setPageLimit={setLimit}
          setPage={setPage}
          count={currentMetaData?.pages || PAGINATION?.PAGE_COUNT}
          totalRecords={currentMetaData?.total || PAGINATION?.TOTAL_RECORDS}
          onPageChange={(newPage: any) => setPage(newPage)}
          currentPage={page}
          pageLimit={limit}
        />
      </Box>
      <br />
    </Grid>
  );
};

export default ConversationSelectModal;
