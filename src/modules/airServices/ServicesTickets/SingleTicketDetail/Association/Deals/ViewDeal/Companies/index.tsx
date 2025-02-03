import { Box, Typography } from '@mui/material';
import { fullName, getInitialsSingleName } from '@/utils/avatarUtils';
import { UncontrolledAccordion } from '@/components/Accordions/UncontrolledAccordion';
import { ACCORDION_VARIANTS } from '@/constants/mui-constant';
import { RecordCountChip } from '@/components/Chip/RecordCountChip';
import { UserInfo } from '@/components/UserInfo';

export default function Companies({ dealCompanies }: any) {
  return (
    <UncontrolledAccordion
      variantType={ACCORDION_VARIANTS?.CARD}
      accordionSummary={
        <RecordCountChip
          totalCount={dealCompanies?.length}
          recordName="Companies"
          recordNameVariant="h5"
        />
      }
    >
      {!dealCompanies?.length ? (
        <Typography variant={'body2'} fontWeight={500}>
          No Companies Associated With This Record
        </Typography>
      ) : (
        dealCompanies?.map((item: any) => (
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
              name={fullName(item?.name)}
              email={item?.domain ?? '---'}
              avatarSrc={item?.profilePicture}
              nameInitial={getInitialsSingleName(item?.name)}
              avatarSize={{ width: 35, height: 35 }}
            />
            <Typography variant={'body2'}>
              {item?.owner?.phoneNumber ?? '---'}
            </Typography>
          </Box>
        ))
      )}
    </UncontrolledAccordion>
  );
}
