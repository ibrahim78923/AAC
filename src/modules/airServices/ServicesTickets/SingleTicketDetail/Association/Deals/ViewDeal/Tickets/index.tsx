import { Box, Typography } from '@mui/material';
import { RecordCountChip } from '@/components/Chip/RecordCountChip';
import { UncontrolledAccordion } from '@/components/Accordions/UncontrolledAccordion';
import { ACCORDION_VARIANTS } from '@/constants/mui-constant';

export default function Tickets({ dealTickets }: any) {
  return (
    <UncontrolledAccordion
      variantType={ACCORDION_VARIANTS?.CARD}
      accordionSummary={
        <RecordCountChip
          totalCount={dealTickets?.length}
          recordName="Tickets"
          recordNameVariant="h5"
        />
      }
    >
      {!dealTickets?.length ? (
        <Typography variant={'body2'} fontWeight={500}>
          No Tickets Associated With This Record
        </Typography>
      ) : (
        dealTickets?.map((item: any) => (
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={1}
            key={item?._id}
            overflow={'auto'}
            mb={2}
          >
            <Box display={'flex'} flexDirection={'column'}>
              <Typography variant={'body2'} fontWeight={500}>
                {item?.ticketIdNumber ?? '---'}
              </Typography>
              <Typography variant={'subtitle2'} fontWeight={400}>
                {item?.subject ?? '---'}
              </Typography>
            </Box>
            <Typography variant={'body2'}>{item?.status ?? '---'}</Typography>
          </Box>
        ))
      )}
    </UncontrolledAccordion>
  );
}
