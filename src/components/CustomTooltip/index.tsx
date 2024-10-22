import { Tooltip } from '@mui/material';

export const CustomTooltip = (props: any) => {
  const {
    title = '',
    children,
    placement = 'top-start',
    isCapital,
    tooltipBgColor = 'primary.main',
    tooltipTextColor = 'common.white',
    ...others
  } = props;
  return (
    <Tooltip
      title={title}
      placement={placement}
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: tooltipBgColor,
            color: tooltipTextColor,
            borderRadius: 1,
            fontWeight: 'fontWeightBold',
            textTransform: isCapital ? 'capitalize' : 'none',
          },
        },
        arrow: {
          sx: {
            color: tooltipBgColor,
          },
        },
      }}
      {...others}
    >
      {children}
    </Tooltip>
  );
};
