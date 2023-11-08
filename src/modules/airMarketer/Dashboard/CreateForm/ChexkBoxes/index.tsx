import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { checkBoxesOptions } from './CheckBoxes.data';
import { v4 as uuidv4 } from 'uuid';

export default function CheckboxList() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {checkBoxesOptions.map((value) => {
        const labelId = `checkbox-list-label-${value?.id}`;

        return (
          <ListItem key={uuidv4()} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={handleToggle(value?.id)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value?.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value?.label} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
