import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const { ATTACHMENT } =
  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_FOLDER_LIST_PERMISSIONS ?? {};

export const ArticlesAttachment = () => {
  const router = useRouter();
  const { articleId } = router.query;

  if (!router?.isReady) return <></>;
  if (!articleId) return <></>;

  return (
    <>
      <Typography
        variant="body1"
        fontWeight={'fontWeightMedium'}
        color="slateBlue.main"
        my={2}
      >
        {' '}
        Attachments{' '}
      </Typography>
      <Box maxHeight={'20vh'}>
        <Attachments
          recordId={articleId as string}
          permissionKey={[ATTACHMENT]}
        />
      </Box>
    </>
  );
};
