import { MenuItem, Select, useTheme } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';

import { BadgeStatusI } from './StatusBadge.interface';
import { styles } from './StatusBadge.style';

import { v4 as uuidv4 } from 'uuid';

const StatusBadge = (props: BadgeStatusI) => {
  const { options = undefined, onChange, value, defaultValue } = props;
  const theme = useTheme();

  return (
    <Select
      IconComponent={KeyboardArrowDown}
      sx={{
        fontSize: '14px',
        backgroundColor:
          value === 'active' || value === 'open'
            ? 'rgba(71, 178, 99, 0.2)'
            : 'rgba(255, 74, 74, 0.2)',
        color:
          value === 'active' || value === 'open'
            ? theme?.palette?.success?.main
            : theme?.palette?.error?.main,
        ...styles.select(value, theme),
      }}
      id="demo-simple-select"
      value={value}
      onChange={onChange}
    >
      {options?.map((item: any) => {
        return (
          <MenuItem
            key={uuidv4()}
            value={item?.value}
            defaultValue={defaultValue}
          >
            {item?.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default StatusBadge;
