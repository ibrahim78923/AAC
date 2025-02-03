import { Box } from '@mui/material';
import { CardLayoutI } from './CardLayout.interface';
import { TruncateText } from '@/components/TruncateText';
import { InteractiveButton } from '@/components/Buttons/InteractiveButton';

export const CardLayout = ({
  title,
  btnClick,
  btnPosition,
  buttonText,
  maxHeight,
  children,
}: CardLayoutI) => {
  return (
    <Box bgcolor={'common.white'} p={2} borderRadius={4} height="100%">
      <Box
        display={'flex'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={1}
        mb={0.5}
        justifyContent={'space-between'}
      >
        <TruncateText text={title?.toLowerCase()} />
        {btnPosition !== 'center' && (
          <InteractiveButton onClick={() => btnClick(title)} variant="text">
            {buttonText}
          </InteractiveButton>
        )}
      </Box>
      <Box sx={{ height: maxHeight, overflowY: 'scroll' }}>{children}</Box>
      {btnPosition === 'center' && (
        <Box textAlign={'center'}>
          <InteractiveButton onClick={() => btnClick(title)} variant="text">
            {buttonText}
          </InteractiveButton>
        </Box>
      )}
    </Box>
  );
};
