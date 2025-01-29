import { Divider, Box } from '@mui/material';
import { useSettings } from './useSettings';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { SOCIAL_COMPONENTS } from '@/constants';

export const Settings = () => {
  const { meetingSettingsData, activeModule, renderSettingsModule, router } =
    useSettings();
  return (
    <>
      <PageTitledHeader
        canMovedBack
        title={'Meeting Settings'}
        moveBack={() => router?.push(SOCIAL_COMPONENTS?.MEETINGS)}
      />

      <Box
        minHeight={'80vh'}
        display="flex"
        gap={1}
        flexWrap={'wrap'}
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Box paddingRight={2} flex={0.3}>
          <Divider />
          <Box paddingY={2}>
            {meetingSettingsData?.map((item: any) => (
              <item.component key={item?.id} {...item?.componentProps}>
                {item?.heading}
              </item.component>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            borderLeft: { md: 1, xs: 0 },
            borderTop: { xs: 1, md: 0 },
            borderLeftColor: { md: 'custom.off_white_three', xs: '' },
            borderTopColor: { xs: 'custom.off_white_three', md: '' },
            pt: { xs: 1, md: 0 },
            paddingX: { xs: 0.5, md: 2 },
            overflow: 'auto',
            maxWidth: '100%',
          }}
        >
          {renderSettingsModule?.[activeModule as any]}
        </Box>
      </Box>
    </>
  );
};
