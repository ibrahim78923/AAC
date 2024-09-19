import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import {
  manageAccountData,
  manageStatusData,
  manageTableColumns,
  manageTableData,
} from './DealStage.data';
import { v4 as uuidv4 } from 'uuid';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import useForecast from '../useforecast';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { styles } from './DealStage.style';
import useDealStage from './useDealStage';
import ViewDealsDrawer from '../ViewDealsDrwaer';
import { useState } from 'react';

const DealStage = () => {
  const { isViewDealDrawer, setIsViewDealDrawer } = useForecast();
  const {
    theme,
    anchorEl,
    isDisabled,
    setIsDisabled,
    tableRowValues,
    setTableRowValues,
    open,
    handleClose,
    handleClick,
    setAnchorEl,
  } = useDealStage();

  const [alignment, setAlignment] = useState('User');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <Box>
      <Box sx={{ marginBottom: '20px' }}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton
            disableRipple
            value="User"
            sx={{
              color: theme?.palette?.primary?.main,
              backgroundColor: '#fff',
              border: `1px solid ${theme?.palette?.grey[0]}`,
              height: '40px',
              '&.Mui-selected': {
                backgroundColor: theme?.palette?.primary?.main,
                color: '#fff',
              },
              '&.Mui-selected:hover': {
                backgroundColor: theme?.palette?.primary?.main,
              },
              '&:hover': {
                backgroundColor: theme?.palette?.primary?.light,
              },
            }}
          >
            Users
          </ToggleButton>
          <ToggleButton
            disableRipple
            value="Team"
            sx={{
              color: theme?.palette?.primary?.main,
              backgroundColor: '#fff',
              border: `1px solid ${theme?.palette?.grey[0]}`,
              height: '40px',
              '&.Mui-selected': {
                backgroundColor: theme?.palette?.primary?.main,
                color: '#fff',
              },
              '&.Mui-selected:hover': {
                backgroundColor: theme?.palette?.primary?.main,
              },
              '&:hover': {
                backgroundColor: theme?.palette?.primary?.light,
              },
            }}
          >
            Teams
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item xs={12} sm={6} md={8.5}>
          <Card sx={{ width: '100%' }}>
            <Typography variant="h4" fontWeight={600} pt={2.4} px={2.4}>
              All Teams
            </Typography>
            <Grid container p={2.4} justifyContent="space-between">
              {manageStatusData?.map((item: any) => (
                <Grid
                  container
                  item
                  xs={12}
                  sm={6}
                  lg={3}
                  key={uuidv4()}
                  justifyContent={{ xs: 'flex-start', lg: 'space-around' }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color={theme?.palette?.grey[900]}
                    >
                      {item?.title}
                    </Typography>
                    <Typography variant="h3" fontWeight={700}>
                      £{item?.count}
                    </Typography>
                  </Box>
                  {item?.divider && (
                    <Divider
                      sx={{
                        borderColor: theme?.palette?.grey[700],
                        display: { xs: 'none', lg: 'block' },
                      }}
                      orientation="vertical"
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3.5}>
          <Card sx={{ width: '100%' }}>
            <Typography variant="h4" fontWeight={600} pt={2.4} px={2.4}>
              Sales Pipeline
            </Typography>
            <Grid container p={2.4} justifyContent="space-between">
              {manageAccountData?.map((item: any) => (
                <Grid
                  container
                  item
                  xs={12}
                  lg={6}
                  key={uuidv4()}
                  justifyContent={{ xs: 'flex-start', lg: 'space-around' }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color={theme?.palette?.grey[900]}
                    >
                      {item?.title}
                    </Typography>
                    <Typography variant="h3">£{item?.count}</Typography>
                  </Box>
                  {item?.divider && (
                    <Divider
                      sx={{
                        borderColor: theme?.palette?.grey[700],
                        display: { xs: 'none', lg: 'block' },
                      }}
                      orientation="vertical"
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Box
        mt={4}
        display="flex"
        justifyContent="space-between"
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={1}
      >
        <Search placeholder="Search" size="small" />
        <Box display="flex" gap={1} flexWrap="wrap">
          <Stack
            direction={{ xs: 'row' }}
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            width={{ xs: '100%', sm: 'auto' }}
          >
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              className="small"
              sx={styles?.actionButton(theme)}
              disabled={isDisabled}
            >
              Actions <ArrowDropDownIcon />
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={() => {
                  setIsViewDealDrawer(true);
                  setAnchorEl(null);
                }}
              >
                View Deal
              </MenuItem>
            </Menu>
          </Stack>
        </Box>
      </Box>
      <Box mt={2}>
        <TanstackTable
          columns={manageTableColumns(
            theme,
            isDisabled,
            setIsDisabled,
            tableRowValues,
            setTableRowValues,
          )}
          data={manageTableData}
          isPagination
        />
      </Box>
      {isViewDealDrawer && (
        <ViewDealsDrawer
          isOpenDrawer={isViewDealDrawer}
          onClose={() => setIsViewDealDrawer(false)}
        />
      )}
    </Box>
  );
};

export default DealStage;
