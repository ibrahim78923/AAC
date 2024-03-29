import { MenuItem, Select, useTheme } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';

import { BadgeStatusI } from './StatusBadge.interface';
import { styles } from './StatusBadge.style';

import { v4 as uuidv4 } from 'uuid';

const StatusBadge = (props: BadgeStatusI) => {
  const { options = undefined, onChange, value, defaultValue } = props;
  const theme = useTheme();

  const switchColor = (val: string = theme?.palette?.custom?.bluish_gray) => {
    const colors: any = {
      bgColor: theme?.palette?.custom?.bluish_gray,
      color: theme?.palette?.common?.white,
    };
    switch (val) {
      case 'ACTIVE':
      case 'active':
      case 'open':
      case 'OPEN':
        colors.bgColor = 'rgba(71, 178, 99, 0.2)';
        colors.color = theme?.palette?.success?.main;
        break;
      case 'INACTIVE':
      case 'inactive':
      case 'close':
      case 'CLOSE':
        colors.bgColor = 'rgba(255, 74, 74, 0.2)';
        colors.color = theme?.palette?.error?.main;
        break;
      case 'pending':
        colors.bgColor = theme?.palette?.custom?.bluish_gray;
        colors.color = theme?.palette?.common?.white;
        break;
      case 'rejected':
        colors.bgColor = theme?.palette?.error?.main;
        colors.color = theme?.palette?.common?.white;
        break;
      case 'shortlisted':
        colors.bgColor = 'rgba(71, 178, 99, 0.2)';
        colors.color = theme?.palette?.success?.main;
        break;
      case 'interviewed':
        colors.bgColor = theme?.palette?.custom?.bluish_gray;
        colors.color = theme?.palette?.common?.white;
        break;
      default:
        colors.bgColor = theme?.palette?.custom?.bluish_gray;
        colors.color = theme?.palette?.common?.white;
    }
    return colors;
  };
  const getColor = switchColor(value);
  return (
    <Select
      IconComponent={KeyboardArrowDown}
      sx={{
        fontSize: '14px',
        backgroundColor: getColor?.bgColor,
        // backgroundColor:
        //   value === 'ACTIVE' || value === 'open'
        //     ? 'rgba(71, 178, 99, 0.2)'
        //     : 'rgba(255, 74, 74, 0.2)',
        color: getColor?.color,
        // color:
        //   value === 'ACTIVE' || value === 'open' || value === 'OPEN'
        //     ? theme?.palette?.success?.main
        //     : theme?.palette?.error?.main,
        ...styles.select(getColor?.color),
      }}
      id="demo-simple-select"
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
    >
      {options?.map((item: any) => {
        return (
          <MenuItem key={uuidv4()} value={item?.value}>
            {item?.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default StatusBadge;
