import { Avatar, Box, Typography } from '@mui/material';
import { FolderIcon } from '@/assets/icons';
import { truncateText } from '@/utils/avatarUtils';
import { CategoryCardPropsI } from './CategoryCard.interface';

export const CategoryCard = (props: CategoryCardPropsI) => {
  const { category, onCardClick, categoryId } = props;
  return (
    <>
      <Box
        onClick={() => onCardClick?.()}
        height="100%"
        borderRadius={2}
        border={'2px solid'}
        borderColor={
          category?._id === categoryId ? 'primary.main' : 'primary.lighter'
        }
        bgcolor={category?._id === categoryId ? 'primary.lighter' : ''}
        textAlign="center"
        p={2}
        sx={{ cursor: 'pointer' }}
      >
        <Avatar sx={{ margin: 'auto' }} variant="rounded">
          <FolderIcon />
        </Avatar>
        <Typography variant="h5" my={2}>
          {truncateText(category?.categoryName ?? '---')}
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          {truncateText(category?.description ?? '---', 70)}
        </Typography>
      </Box>
    </>
  );
};
