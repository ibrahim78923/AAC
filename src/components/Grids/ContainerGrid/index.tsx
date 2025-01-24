import { Grid } from '@mui/material';

export const ContainerGrid = (props: any) => {
  const {
    spacing = 2,
    rowSpacing = spacing,
    columnSpacing = spacing,
    customStyles,
    children,
  } = props;

  return (
    <Grid
      container
      spacing={spacing}
      rowSpacing={rowSpacing}
      columnSpacing={columnSpacing}
      sx={{ ...customStyles }}
    >
      {children}
    </Grid>
  );
};
