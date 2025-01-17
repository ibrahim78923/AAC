import { Box, Typography } from '@mui/material';
import { TICKET_GRAPH_TYPES } from '@/constants/strings';
import { TicketStatusGraph } from './TicketStatusGraph';
import { TicketPriorityGraph } from './TicketPriorityGraph';
import { dropDownMenus } from './TicketBased.data';
import { pxToRem } from '@/utils/getFontValue';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setTicketBasedGraphType } from '@/redux/slices/airServices/dashboard/slice';
import { PublicSingleDropdownButton } from '@/components/Buttons/PublicSingleDropdownButton';
import { dashboardTicketBasedGraphTypeSelector } from '@/redux/slices/airServices/dashboard/selectors';

export const TicketBased = (props: any) => {
  const { data, isPreviewMode } = props;

  const ticketBasedGraphType = useAppSelector(
    dashboardTicketBasedGraphTypeSelector,
  );

  const dispatch = useAppDispatch();

  const setTicketGraphType = (ticketType: string) => {
    dispatch(setTicketBasedGraphType<any>(ticketType));
  };
  const dropDownOptions = dropDownMenus(setTicketGraphType);

  const ticketBasedChart = {
    [TICKET_GRAPH_TYPES?.STATUS]: (
      <TicketStatusGraph chartData={data?.tickets} />
    ),
    [TICKET_GRAPH_TYPES?.PRIORITY]: (
      <TicketPriorityGraph chartData={data?.tickets} />
    ),
  };

  return (
    <Box
      borderRadius={3}
      border={`1px solid`}
      borderColor="custom.off_white_three"
      height="100%"
      overflow={'auto'}
    >
      <Box minWidth={pxToRem(500)}>
        <Box
          display={'flex'}
          flexWrap={'wrap'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={2}
          px={2}
          py={1}
          borderBottom={`1px solid`}
          borderColor="custom.off_white_three"
        >
          <Typography variant="h5" color="slateBlue.main">
            Tickets based on {ticketBasedGraphType}
          </Typography>
          <PublicSingleDropdownButton
            dropdownOptions={dropDownOptions}
            dropdownName={ticketBasedGraphType}
            disabled={isPreviewMode}
          />
        </Box>
        <Box p={2}>{ticketBasedChart?.[ticketBasedGraphType]}</Box>
      </Box>
    </Box>
  );
};
