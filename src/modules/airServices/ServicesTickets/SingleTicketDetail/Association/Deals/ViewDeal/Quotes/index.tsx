import { Box, Typography } from '@mui/material';
import { uiDateFormat } from '@/lib/date-time';
import { UncontrolledAccordion } from '@/components/Accordions/UncontrolledAccordion';
import { ACCORDION_VARIANTS } from '@/constants/mui-constant';
import { RecordCountChip } from '@/components/Chip/RecordCountChip';
import { CustomChip } from '@/components/Chip/CustomChip';
import { ARTICLE_STATUS } from '@/constants/services';

export default function Quotes({ dealQuotes }: any) {
  return (
    <UncontrolledAccordion
      variantType={ACCORDION_VARIANTS?.CARD}
      accordionSummary={
        <RecordCountChip
          totalCount={dealQuotes?.length}
          recordName="Quotes"
          recordNameVariant="h5"
        />
      }
    >
      {!dealQuotes?.length ? (
        <Typography variant={'body2'} fontWeight={500}>
          No Quotes Associated With This Record
        </Typography>
      ) : (
        dealQuotes?.map((item: any) => (
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
              <Typography variant={'body2'} fontWeight={700}>
                {item?.name ?? '---'}
              </Typography>
              <Typography variant={'body2'} fontWeight={400}>
                {uiDateFormat(item?.expiryDate)}
              </Typography>
            </Box>
            <CustomChip
              label={item?.status ?? '---'}
              fontWeight={600}
              textColor="slateBlue.main"
              size="medium"
              backgroundColor={
                item?.status === ARTICLE_STATUS?.PUBLISHED
                  ? 'success.light'
                  : 'warning.lighter'
              }
            />
          </Box>
        ))
      )}
    </UncontrolledAccordion>
  );
}
