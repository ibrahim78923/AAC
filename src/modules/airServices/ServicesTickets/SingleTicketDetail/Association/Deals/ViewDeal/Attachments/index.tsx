import { Box, Typography } from '@mui/material';
import { UncontrolledAccordion } from '@/components/Accordions/UncontrolledAccordion';
import { ACCORDION_VARIANTS, AVATAR_VARIANTS } from '@/constants/mui-constant';
import { RecordCountChip } from '@/components/Chip/RecordCountChip';
import { CustomAvatar } from '@/components/Avatars/CustomAvatar';

export default function Attachments({ dealAttachments }: any) {
  return (
    <UncontrolledAccordion
      variantType={ACCORDION_VARIANTS?.CARD}
      accordionSummary={
        <RecordCountChip
          totalCount={dealAttachments?.length}
          recordName="Attachments"
          recordNameVariant="h5"
        />
      }
    >
      {!dealAttachments?.length ? (
        <Typography variant={'body2'} fontWeight={500}>
          No Attachments Associated With This Record
        </Typography>
      ) : (
        <Box display={'flex'} alignItems={'center'} gap={2}>
          {dealAttachments?.map((item: any) => (
            <CustomAvatar
              key={item?._id}
              avatarSrc={item?.fileUrl}
              avatarSize={{
                width: 45,
                height: 45,
                variant: AVATAR_VARIANTS?.ROUNDED,
              }}
            />
          ))}
        </Box>
      )}
    </UncontrolledAccordion>
  );
}
