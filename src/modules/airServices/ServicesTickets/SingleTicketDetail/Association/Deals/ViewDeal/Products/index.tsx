import { Box, Typography } from '@mui/material';
import { getInitialsSingleName } from '@/utils/avatarUtils';
import { UncontrolledAccordion } from '@/components/Accordions/UncontrolledAccordion';
import { ACCORDION_VARIANTS } from '@/constants/mui-constant';
import { RecordCountChip } from '@/components/Chip/RecordCountChip';
import { UserInfo } from '@/components/UserInfo';

export default function Products({ dealProducts }: any) {
  return (
    <UncontrolledAccordion
      variantType={ACCORDION_VARIANTS?.CARD}
      accordionSummary={
        <RecordCountChip
          totalCount={dealProducts?.length}
          recordName="Products"
          recordNameVariant="h5"
        />
      }
    >
      {!dealProducts?.length ? (
        <Typography variant={'body2'} fontWeight={500}>
          No Products Associated With This Record
        </Typography>
      ) : (
        dealProducts?.map((item: any) => (
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={1}
            key={item?._id}
            overflow={'auto'}
            mb={2}
          >
            <UserInfo
              isNameCapital={false}
              name={`${item?.name ?? '---'} x${item?.quantity ?? ''}`}
              avatarSrc={item?.image?.url}
              nameInitial={getInitialsSingleName(item?.name)}
              avatarSize={{ width: 35, height: 35 }}
            />
            <Typography variant={'body2'}>
              £{item?.unitPrice ?? '---'}
            </Typography>
          </Box>
        ))
      )}
    </UncontrolledAccordion>
  );
}
