import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WorkloadDrawer from '../WorkloadDrawer/WorkloadDrawer';
import { useGetWorkloadQuery } from '@/services/airServices/workload';
import { workloadDefaultDateRange } from '../Workload.data';

export const ManageWorkload = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [manage, setManage] = useState<any>();

  const open = Boolean(anchorEl);

  const [dateRange, setDateRange] = useState<any>(workloadDefaultDateRange);
  const [modifiedRange, setModifiedRange] = useState<any>(
    workloadDefaultDateRange,
  );

  const { data, isLoading, isFetching, isError } = useGetWorkloadQuery(
    {
      manage: manage,
      startDate: dateRange?.[0]?.startDate?.toISOString(),
      endDate: dateRange?.[0]?.endDate?.toISOString(),
      modifiedStartDate: modifiedRange?.[0]?.startDate?.toISOString(),
      modifiedEndDate: modifiedRange?.[0]?.endDate?.toISOString(),
    },
    { skip: !openDrawer, refetchOnMountOrArgChange: true },
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleMenuItemClick = (value: any) => {
    setManage(value);
    setOpenDrawer(true);
    setAnchorEl(null);
  };

  const manageWorkLoadOptions = [
    { label: 'All', value: undefined },
    { label: 'Planned', value: 'PLANNED' },
    { label: 'UnPlanned', value: 'UNPLANNED' },
    { label: 'Delayed', value: 'DELAYED' },
  ];

  return (
    <Fragment>
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
    </Fragment>
  );
};
