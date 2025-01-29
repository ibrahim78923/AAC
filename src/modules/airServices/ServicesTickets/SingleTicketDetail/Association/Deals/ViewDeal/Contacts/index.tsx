import { Box, Typography } from '@mui/material';
import { UncontrolledAccordion } from '@/components/Accordions/UncontrolledAccordion';
import { ACCORDION_VARIANTS } from '@/constants/mui-constant';
import { DataRecordCount } from '@/components/DataRecordCount';
import { UserInfo } from '@/components/UserInfo';
import { fullName, getInitialsSingleName } from '@/utils/avatarUtils';

export default function Contacts({ dealContacts }: any) {
  return (
    <UncontrolledAccordion
      variantType={ACCORDION_VARIANTS?.CARD}
      accordionSummary={
        <DataRecordCount
          totalCount={dealContacts?.length}
          recordName="Contacts"
          recordNameVariant="h5"
        />
      }
    >
      {!dealContacts?.length ? (
        <Typography variant={'body2'} fontWeight={500}>
          No Contacts Associated With This Record
        </Typography>
      ) : (
        dealContacts?.map((item: any) => (
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
              email={item?.email ?? '---'}
              avatarSrc={item?.profilePicture}
              nameInitial={getInitialsSingleName(item?.name)}
              avatarSize={{ width: 35, height: 35 }}
            />
            <Typography variant={'body2'}>
              {item?.phoneNumber ?? '---'}
            </Typography>
          </Box>
        ))
      )}
    </UncontrolledAccordion>
  );
}
