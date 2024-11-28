import { Grid, Box } from '@mui/material';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import { useTicketsBoardView } from './useTicketsBoardView';
import CustomPagination from '@/components/CustomPagination';
import { DataRecordCount } from '@/components/DataRecordCount';
import { RENDER_COLOR } from './TicketsBoardView.data';
import { pxToRem } from '@/utils/getFontValue';
import { TicketInfoCard } from './TicketInfoCard';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import {
  CustomDragDropContext,
  CustomDraggable,
  CustomDroppable,
} from '@/components/DragAndDrop';

export const TableBoardView = () => {
  const {
    HEAD_STATUS,
    lazyGetTicketsStatus,
    page,
    handleSetPageLimit,
    handleSetPage,
    getTicketsListData,
    decrement,
    increment,
    onDragEnd,
    ticketLists,
    apiCallSuccess,
  } = useTicketsBoardView();

  if (lazyGetTicketsStatus?.isError)
    return (
      <ApiErrorState canRefresh refresh={() => getTicketsListData?.(page)} />
    );
  if (
    (lazyGetTicketsStatus?.isLoading || lazyGetTicketsStatus?.isFetching) &&
    !apiCallSuccess
  )
    return (
      <SkeletonCard
        length={12}
        flexDirectionRectangular="column"
        circularSkeletonSize={{ width: 50, height: 50 }}
      />
    );

  if (!!!lazyGetTicketsStatus?.data?.data?.tickets?.length)
    return <NoData message="No ticket found" />;

  return (
    <>
      <Box>
        <Grid
          container
          spacing={2}
          flexWrap={'nowrap'}
          sx={{ overflowX: 'auto', overflowY: 'hidden' }}
        >
          <CustomDragDropContext onDragEnd={onDragEnd}>
            {HEAD_STATUS?.map((head: any) => (
              <Grid
                item
                xs={3}
                sx={{ minWidth: pxToRem(400) }}
                key={head?.heading}
              >
                <Box mb={0.5}>
                  <DataRecordCount
                    totalCount={ticketLists?.[head?.be]?.length}
                    recordName={head?.heading}
                    color={RENDER_COLOR?.[head?.heading]}
                  />
                </Box>

                <CustomDroppable
                  droppableId={head?.be}
                  droppableStyle={{
                    height: '100%',
                    overflow: 'auto',
                    bgcolor: 'grey.400',
                    p: 2,
                    borderTop: '3px solid',
                    borderColor: RENDER_COLOR?.[head?.heading],
                  }}
                >
                  {ticketLists?.[head?.be]?.map((item: any, index: number) => (
                    <CustomDraggable
                      key={item?._id}
                      draggableId={item?._id}
                      index={index}
                    >
                      <TicketInfoCard details={item} id={item?._id} />
                    </CustomDraggable>
                  ))}
                </CustomDroppable>
              </Grid>
            ))}
          </CustomDragDropContext>
        </Grid>
      </Box>
      <CustomPagination
        count={lazyGetTicketsStatus?.data?.data?.meta?.pages}
        pageLimit={lazyGetTicketsStatus?.data?.data?.meta?.limit}
        currentPage={lazyGetTicketsStatus?.data?.data?.meta?.page}
        onPageChange={(page: number) => handleSetPage(page)}
        setPage={handleSetPage}
        setPageLimit={handleSetPageLimit}
        totalRecords={lazyGetTicketsStatus?.data?.data?.meta?.total}
        incrementPageClick={increment}
        decrementPageClick={decrement}
      />
    </>
  );
};
