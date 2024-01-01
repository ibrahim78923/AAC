import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { DragSharedIcon } from '@/assets/icons';
import { styles } from './CustomizeColumns.style';

const CustomizeColumns = ({
  open,
  onClose,
  columns,
  checkedColumns,
  handleToggleColumns,
  onSubmit,
}: any) => {
  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      title={'Edit Columns'}
      footer
      okText={'Apply'}
      isOk
      cancelText={'Cancel'}
      submitHandler={onSubmit}
    >
      <List sx={styles?.columnsList}>
        {columns?.map((col: any) => {
          if (col?.id === 'cellCheckbox') {
            return null;
          }
          return (
            <ListItem key={col?.id} disablePadding>
              <ListItemButton
                className={
                  checkedColumns?.indexOf(col?.id) !== -1 ? 'selected' : ''
                }
                role={undefined}
                onClick={handleToggleColumns(col?.id)}
                dense
              >
                <ListItemIcon>
                  <DragSharedIcon />
                </ListItemIcon>
                <ListItemText primary={col?.header} />
                <Checkbox
                  edge="start"
                  checked={checkedColumns?.indexOf(col?.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </CommonDrawer>
  );
};

export default CustomizeColumns;
