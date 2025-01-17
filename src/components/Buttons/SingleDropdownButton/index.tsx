import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IconButton, Typography } from '@mui/material';
import { useSingleDropdownButton } from './useSingleDropdownButton';
import {
  SingleDropdownButtonPropsI,
  SingleDropdownOptionI,
} from './SingleDropdownButton.interface';
import { ConditionalPermissionGuard } from '@/GuardsAndPermissions/ConditionalPermissionGuard';

export const SingleDropdownButton = (props: SingleDropdownButtonPropsI) => {
  const {
    dropdownOptions,
    disabled,
    dropdownName = 'Actions',
    hasEndIcon = true,
    btnVariant = 'outlined',
    Variant = hasEndIcon ? Button : IconButton,
    menuSxProps,
    ...buttonProps
  } = props;

  const { anchorEl, open, theme, handleClick, handleClose } =
    useSingleDropdownButton();

  const buttonPropsWithIcon =
    Variant === Button ? { endIcon: hasEndIcon && <ArrowDropDownIcon /> } : {};

  return (
    <>
      <Variant
        className="small"
        variant={btnVariant}
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="secondary"
        disabled={disabled}
        sx={{ textTransform: 'capitalize' }}
        {...buttonPropsWithIcon}
        {...buttonProps}
      >
        {dropdownName}
      </Variant>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ padding: 2, ...menuSxProps }}
      >
        {dropdownOptions?.map((singleOption: SingleDropdownOptionI) => (
          <ConditionalPermissionGuard
            hasNoPermission={singleOption?.hasNoPermission ?? false}
            permissions={singleOption?.permissionKey}
            key={singleOption?.id}
          >
            <MenuItem
              disabled={singleOption?.disabled}
              onClick={(event: any) => {
                event?.stopPropagation();
                singleOption?.handleClick?.(handleClose);
              }}
              sx={{
                cursor: 'pointer',
                '&.MuiMenuItem-root': {
                  marginBottom: { md: 0.5 },
                  marginX: { md: 0.5 },
                },
              }}
            >
              <Typography
                variant="body2"
                color={theme?.palette?.grey?.[600]}
                fontWeight={'fontWeightMedium'}
                sx={singleOption?.titleSx}
              >
                {singleOption?.title}
              </Typography>
            </MenuItem>
          </ConditionalPermissionGuard>
        ))}
      </Menu>
    </>
  );
};
