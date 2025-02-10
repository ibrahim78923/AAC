import { Box } from '@mui/material';
import { CardLayoutI } from './CardLayout.interface';
import { TruncateText } from '@/components/TruncateText';
import { CustomButton } from '@/components/Buttons/CustomButton';

export const CardLayout = (props: CardLayoutI) => {
  const { title, btnClick, btnPosition, buttonText, maxHeight, children } =
    props;
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
          <CustomButton
            hasIcon={false}
            onClick={() => btnClick(title)}
            variant="text"
            color="primary"
          >
            {buttonText}
          </CustomButton>
        )}
      </Box>
      <Box sx={{ height: maxHeight, overflowY: 'scroll' }}>{children}</Box>
      {btnPosition === 'center' && (
        <Box textAlign={'center'}>
          <CustomButton
            hasIcon={false}
            onClick={() => btnClick(title)}
            variant="text"
            color="primary"
          >
            {buttonText}
          </CustomButton>
        </Box>
      )}
    </Box>
  );
};
