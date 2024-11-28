import { PageTitledHeader } from '@/components/PageTitledHeader';
import { TruncateText } from '@/components/TruncateText';
import { Box } from '@mui/material';

export const Text = (props: any) => {
  const { title, description } = props;
  return (
    <>
      <PageTitledHeader
        title={<TruncateText text={title} />}
        titleVariant="h5"
      />
      <Box maxHeight={'20vh'} overflow={'auto'}>
        <Box
          sx={{ wordBreak: 'break-all' }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </Box>
    </>
  );
};

export default Text;
