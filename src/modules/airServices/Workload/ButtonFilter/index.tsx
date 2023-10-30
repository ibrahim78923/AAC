import { Button } from '@mui/material';
import { Fragment, useState } from 'react';
import Filter from '@/assets/icons/modules/airSales/deals/filter';

export const ButtonFilter = () => {
  const [filters, setFilters] = useState<null | HTMLElement>(null);
  const openFilters = Boolean(filters);

  return (
    <Fragment>
      <Button variant="contained" sx={{ mx: 2 }}>
        Unassigned Work
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        aria-controls={openFilters ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openFilters ? 'true' : undefined}
        onClick={(event: React.MouseEvent<HTMLElement>) =>
          setFilters(event?.currentTarget)
        }
        startIcon={<Filter />}
      >
        Filter
      </Button>
    </Fragment>
  );
};
