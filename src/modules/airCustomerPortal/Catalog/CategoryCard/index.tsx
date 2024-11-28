import { Avatar, Box } from '@mui/material';
import { FolderIcon } from '@/assets/icons';
import { CategoryCardPropsI } from './CategoryCard.interface';
import { pxToRem } from '@/utils/getFontValue';
import { TruncateText } from '@/components/TruncateText';

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
        <TruncateText
          text={category?.categoryName}
          boxProps={{
            sx: { fontSize: pxToRem(18), fontWeight: 600 },
          }}
        />
        <TruncateText
          text={category?.description}
          size={70}
          boxProps={{
            sx: { fontSize: pxToRem(14) },
          }}
        />
      </Box>
    </>
  );
};
