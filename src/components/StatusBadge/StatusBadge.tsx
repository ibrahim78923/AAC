import { MenuItem, Select } from '@mui/material';

import { BadgeStatusInterface } from './StatusBadge.interface';

import { useTheme } from '@mui/material/styles';

import { v4 as uuidv4 } from 'uuid';

import { style } from './StatusBadge.style';

const StatusBadge = (props: BadgeStatusInterface) => {
  const { options = undefined, onChange, value } = props;
  const theme = useTheme();
  const colors: any = {
    success: {
      color: theme?.palette?.success?.main,
      bgColor: theme?.palette?.success?.light,
    },
    danger: {
      color: theme?.palette?.error?.main,
      bgColor: theme?.palette?.error?.light,
    },
  };
  return (
    <Select
      sx={{
        backgroundColor:
          value === 'active' || value === 'open'
            ? colors.success.bgColor
            : colors.danger.bgColor,
        color:
          value === 'active' || value === 'open'
            ? colors.success.color
            : colors.danger.color,
        ...style.select,
      }}
      id="demo-simple-select"
      value={value}
      onChange={onChange}
    >
      {options?.map((item: any) => {
        return (
          <MenuItem
            key={uuidv4()}
            sx={{ color: colors[item?.color].color }}
            value={item.value}
          >
            {item.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default StatusBadge;
