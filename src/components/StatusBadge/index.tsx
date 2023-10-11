import { MenuItem, Select, useTheme } from '@mui/material';

import { BadgeStatusI } from './StatusBadge.interface';

import { styles } from './StatusBadge.style';

import { v4 as uuidv4 } from 'uuid';

const StatusBadge = (props: BadgeStatusI) => {
  const { options = undefined, onChange, value } = props;
  const theme = useTheme();

  return (
    <Select
      sx={{
        backgroundColor:
          value === 'active' || value === 'open'
            ? theme?.palette?.success?.light
            : theme?.palette?.error?.light,
        color:
          value === 'active' || value === 'open'
            ? theme?.palette?.success?.main
            : theme?.palette?.error?.main,
        ...styles.select,
      }}
      id="demo-simple-select"
      value={value}
      onChange={onChange}
    >
      {options?.map((item: any) => {
        return (
          <MenuItem key={uuidv4()} value={item.value}>
            {item.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default StatusBadge;
