import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Typography } from '@mui/material';
import { useSingleDropdownButton } from './useSingleDropdownButton';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

export const SingleDropdownButton = (props: any) => {
  const {
    dropdownOptions,
    disabled,
    dropdownName = 'Actions',
    hasEndIcon = true,
    btnVariant = 'outlined',
    ...buttonProps
  } = props;
  const { anchorEl, open, theme, handleClick, handleClose } =
    useSingleDropdownButton();
  return (
    <>
      <Button
        variant={btnVariant}
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={hasEndIcon && <ArrowDropDownIcon />}
        color="secondary"
        disabled={disabled}
        sx={{ textTransform: 'capitalize' }}
        {...buttonProps}
      >
        {dropdownName}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ padding: 2 }}
      >
        {dropdownOptions?.map((singleOption: any) => (
          <PermissionsGuard
            permissions={[singleOption?.permissionKey]}
            key={singleOption?.id}
          >
            <MenuItem
              onClick={() => singleOption?.handleClick?.(handleClose)}
              sx={{
                '&.MuiMenuItem-root': {
                  marginBottom: { md: 0.5 },
                  marginX: { md: 0.5 },
                },
              }}
            >
              <Typography
                variant="body2"
                color={theme?.palette?.grey?.[600]}
                fontWeight={500}
              >
                {singleOption?.title}{' '}
              </Typography>
            </MenuItem>
          </PermissionsGuard>
        ))}
      </Menu>
    </>
  );
};
