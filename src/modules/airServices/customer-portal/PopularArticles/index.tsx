import { CardLayout } from '../CardLayout';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DocumentTextIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
export const PopularArticles = ({ articles = [] }: any) => {
  const { palette }: any = useTheme();
  return (
    <CardLayout
      title={'Popular Articles'}
      btnClick={() => {}}
      btnPosition={'center'}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1.6,
          py: 1.6,
          background: 'green',
        }}
      >
        {articles?.map((article: string) => (
          <Box
            key={uuidv4()}
            sx={{
              px: 1.2,
              py: 0.6,
              display: 'flex',
              alignItems: 'center',
              gap: 0.6,
              borderRadius: 1,
              background: palette?.grey?.[100],
            }}
          >
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
