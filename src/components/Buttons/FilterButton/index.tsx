import { Button } from '@mui/material';
import { FilterSharedIcon } from '@/assets/icons';

export const FilterButton = (props: any) => {
  const { children, onClick } = props;
  return (
    <Button
      color="secondary"
      variant="outlined"
      startIcon={<FilterSharedIcon />}
      onClick={onClick}
      className="small"
    >
      {children}
    </Button>
  );
};
