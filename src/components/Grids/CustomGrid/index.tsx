import { Grid } from '@mui/material';
import { CustomGridPropsI } from '../Grids.interface';

export const CustomGrid = (props: CustomGridPropsI) => {
  const {
    xs = 12,
    sm = xs,
    md = sm,
    lg = md,
    xl = lg,
    customStyles,
    children,
  } = props;

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} sx={{ ...customStyles }}>
      {children}
    </Grid>
  );
};
