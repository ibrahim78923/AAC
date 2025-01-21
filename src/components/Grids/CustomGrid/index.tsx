import { Grid } from '@mui/material';

export const CustomGrid = (props: any) => {
  const {
    isContainer = false,
    spacing = 2,
    rowSpacing = spacing,
    columnSpacing = spacing,
    sm = 12,
    md = sm,
    lg = md,
    xl = lg,
    customStyles,
    children,
  } = props;

  if (isContainer)
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

  return (
    <Grid item xs={12} sm={sm} md={md} lg={lg} xl={xl} sx={{ ...customStyles }}>
      {children}
    </Grid>
  );
};
