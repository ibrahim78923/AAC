import React from 'react';
import { Popover, Button, MenuItem, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TaskInterfacePropsI } from './ActionBtn.interface';
import { styles } from './ActionBtn.style';
import { useAppSelector } from '@/redux/store';

const ActionBtn = ({
  disableActionBtn,
  onChange,
  variant,
  menuItems,
  title = 'Actions',
  color = 'inherit',
}: TaskInterfacePropsI) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectedTaskIds = useAppSelector(
    (state: any) => state?.task?.selectedTaskIds,
  );
  return (
    <>
      <Button
        className="small"
        color={color}
        variant={variant}
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        disabled={disableActionBtn}
        classes={{ outlined: 'outlined_btn' }}
        type="submit"
        sx={styles(theme, disableActionBtn)}
      >
        {title}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {menuItems?.map((item: any) => {
          const isAbleToEdit =
            selectedTaskIds?.length > 1 &&
            (item?.name === 'edit' || item?.name === 'viewActivity');
          return (
            <MenuItem
              disabled={isAbleToEdit}
              onClick={() => {
                if (!isAbleToEdit) {
                  onChange(item?.name);
                  handleClose();
                }
              }}
              key={item?.item}
            >
              {item?.item}
            </MenuItem>
          );
        })}
      </Popover>
    </>
  );
};

export default ActionBtn;
