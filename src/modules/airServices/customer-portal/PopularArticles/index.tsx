import { CardLayout } from '../CardLayout';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DocumentTextIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './PopularArticles.style';
export const PopularArticles = ({ articles = [] }: any) => {
  const { palette }: any = useTheme();
  const { mainWrapper, articleWrapper } = styles;
  return (
    <CardLayout
      title={'Popular Articles'}
      btnClick={() => {}}
      maxHeight={260}
      btnPosition={'center'}
    >
      <Box sx={mainWrapper}>
        {articles?.map((article: string) => (
          <Box key={uuidv4()} sx={articleWrapper(palette)}>
            <DocumentTextIcon />
            <Typography variant="body2" color={palette?.grey?.[600]}>
              {article}
            </Typography>
          </Box>
        ))}
      </Box>
    </CardLayout>
  );
};
