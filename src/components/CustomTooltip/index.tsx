import { Tooltip } from '@mui/material';

export const CustomTooltip = (props: any) => {
  const { title = '', children, placement = 'top', ...others } = props;
  return (
    <Tooltip
      title={title}
      placement={placement}
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: 'primary.main',
            color: 'common.white',
            borderRadius: 1,
            fontWeight: 700,
          },
        },
        arrow: {
          sx: {
            color: 'primary.main',
          },
        },
      }}
      {...others}
    >
      {children}
    </Tooltip>
  );
};
