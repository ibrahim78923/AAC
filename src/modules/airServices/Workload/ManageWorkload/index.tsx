import { Button, Menu, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WorkloadDrawer from '../WorkloadDrawer';
import useManageWorkload from './useManageWorkload';

export const ManageWorkload = () => {
  const {
    handleClick,
    anchorEl,
    open,
    setAnchorEl,
    manageWorkLoadOptions,
    handleMenuItemClick,
    openDrawer,
    data,
    setOpenDrawer,
    dateRange,
    manage,
    setDateRange,
    isLoading,
    isFetching,
    isError,
    setModifiedRange,
    modifiedRange,
  } = useManageWorkload();

  return (
    <>
      <Button
        variant={'outlined'}
        color={'inherit'}
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
      >
        Manage Workload
      </Button>

      <Menu
        id="workload"
        aria-labelledby="workload"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        aria-controls={open ? 'workload' : undefined}
      >
        {manageWorkLoadOptions?.map((item: any) => (
          <MenuItem
            key={item?.label}
            onClick={() => handleMenuItemClick?.(item?.value)}
            sx={{
              '&.MuiMenuItem-root': {
                marginBottom: { md: 0.5 },
                marginX: { md: 0.5 },
                width: 170,
              },
            }}
          >
            <Typography variant="body2" fontWeight={500}>
              {item?.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>

      {openDrawer && (
        <WorkloadDrawer
          dataArray={data}
          setOpenDrawer={setOpenDrawer}
          openDrawer={openDrawer}
          dateRange={dateRange}
          state={manage}
          onChangeDateHandler={(item: any) => setDateRange([item?.selection])}
          setDateRange={setDateRange}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          setModifiedRange={setModifiedRange}
          modifiedRange={modifiedRange}
          onChangeModifiedHandler={(item: any) =>
            setModifiedRange([item?.selection])
          }
        />
      )}
    </>
  );
};
