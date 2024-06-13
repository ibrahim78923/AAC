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
        width={'100%'}
        display="flex"
        gap={1}
        flexWrap={'wrap'}
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Box paddingRight={2} flex={0.25}>
          <Divider />
          <Box paddingY={2}>
            {meetingSettingsData?.map((item: any) => (
              <item.component key={item?.id} {...item?.componentProps}>
                {item?.heading}
              </item.component>
            ))}
          </Box>
        </Box>
        <Divider orientation="vertical" variant="fullWidth" flexItem />
        <Box flex={1} paddingX={2}>
          {renderSettingsModule?.[activeModule as any]}
        </Box>
      </Box>
    </>
  );
};
