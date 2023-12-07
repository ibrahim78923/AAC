import React from 'react';

import {
  Box,
  Typography,
  Button,
  InputAdornment,
  TextField,
  MenuItem,
  Menu,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import { AlertModals } from '@/components/AlertModals';

import { columns, dataArray, permissionArr } from './RolesRight.data';
import useRoleAndRight from './useRoleAndRight';

import { rolesAndRightTableData } from '@/mock/modules/airSales/SettingSales';

import { v4 as uuidv4 } from 'uuid';

const RolesRight = () => {
  const {
    isDraweropen,
    setIsDraweropen,
    isOpenDelete,
    setIsOpenDelete,
    isEditOpen,
    expanded,
    open,
    handleClick,
    handleCloseDrawer,
    methods,
    handleClose,
    handleChange,
    theme,
    anchorEl,
  } = useRoleAndRight();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDraweropen}
        onClose={handleCloseDrawer}
        title={'Add New Role'}
        okText={'Add'}
        footer={true}
        isOk={true}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
            <Grid container spacing={4}>
              {dataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
            </Grid>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: `${theme?.palette?.grey[600]}` }}
            >
              Permissions
              <span style={{ color: `${theme?.palette?.error?.main}` }}>*</span>
            </Typography>
            {permissionArr?.map((item) => {
              return (
                <>
                  <Grid item xs={12} key={uuidv4()}>
                    <Accordion
                      sx={{
                        '&.MuiAccordion-root': {
                          borderRadius: '8px',
                        },
                        background: `${theme?.palette?.blue?.main}`,
                        color: `${theme?.palette?.common?.white}`,
                        marginY: '16px',
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <ArrowDropDownIcon sx={{ fontSize: '40px' }} />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Switch />
                          <Typography>{item?.mainTitle}</Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          background: `${theme?.palette?.common?.white}`,
                        }}
                      >
                        {item?.subModule?.map((items) => {
                          return (
                            <>
                              <Accordion
                                key={uuidv4()}
                                expanded={expanded}
                                onChange={handleChange}
                                sx={{
                                  height: `${expanded ? '200px' : 0}`,
                                  overflowX: 'scroll',
                                  '&:hover': {
                                    background: `${theme?.palette?.grey[100]}`,
                                  },
                                }}
                              >
                                <AccordionSummary
                                  expandIcon={
                                    <ChevronRightIcon
                                      sx={{
                                        transform: `rotate(${
                                          expanded ? '270deg' : '0deg'
                                        })`,
                                        transition: (theme) =>
                                          theme.transitions.create(
                                            'transform',
                                            {
                                              duration:
                                                theme.transitions.duration
                                                  .shortest,
                                            },
                                          ),
                                      }}
                                    />
                                  }
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                  sx={{
                                    flexDirection: 'row-reverse',
                                    gap: '6px',
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Typography>{items?.subTitle}</Typography>
                                    <Box
                                      sx={{
                                        position: 'absolute',
                                        right: 0,
                                      }}
                                    >
                                      <FormControlLabel
                                        control={<Checkbox />}
                                        label={items?.mainCheck}
                                      />
                                    </Box>
                                  </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                  {items?.fetaures?.map((feature) => {
                                    return (
                                      <>
                                        <FormGroup key={uuidv4()}>
                                          <FormControlLabel
                                            control={<Checkbox />}
                                            label={feature?.label}
                                          />
                                        </FormGroup>
                                      </>
                                    );
                                  })}
                                </AccordionDetails>
                              </Accordion>
                            </>
                          );
                        })}
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </>
              );
            })}
          </FormProvider>
        </Box>
      </CommonDrawer>
      <CommonDrawer
        isDrawerOpen={isEditOpen}
        onClose={handleCloseDrawer}
        title={'User Role'}
        okText={'OK'}
        footer={true}
        isOk={true}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
            <Grid container spacing={4}>
              {dataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
            </Grid>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: `${theme?.palette?.grey[600]}` }}
            >
              Permissions
              <span style={{ color: `${theme?.palette?.error?.main}` }}>*</span>
            </Typography>
            {permissionArr?.map((item) => {
              return (
                <>
                  <Grid item xs={12} key={uuidv4()}>
                    <Accordion
                      sx={{
                        '&.MuiAccordion-root': {
                          borderRadius: '8px',
                        },
                        background: `${theme?.palette?.blue?.main}`,
                        color: `${theme?.palette?.common?.white}`,
                        marginY: '16px',
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <ArrowDropDownIcon sx={{ fontSize: '40px' }} />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Switch />
                          <Typography>{item?.mainTitle}</Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          background: `${theme?.palette?.common?.white}`,
                        }}
                      >
                        {item?.subModule?.map((items) => {
                          return (
                            <>
                              <Accordion
                                key={uuidv4()}
                                expanded={expanded}
                                onChange={handleChange}
                                sx={{
                                  height: `${expanded ? '200px' : 0}`,
                                  overflowX: 'scroll',
                                  '&:hover': {
                                    background: `${theme?.palette?.grey[100]}`,
                                  },
                                }}
                              >
                                <AccordionSummary
                                  expandIcon={
                                    <ChevronRightIcon
                                      sx={{
                                        transform: `rotate(${
                                          expanded ? '270deg' : '0deg'
                                        })`,
                                        transition: (theme) =>
                                          theme.transitions.create(
                                            'transform',
                                            {
                                              duration:
                                                theme.transitions.duration
                                                  .shortest,
                                            },
                                          ),
                                      }}
                                    />
                                  }
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                  sx={{
                                    flexDirection: 'row-reverse',
                                    gap: '6px',
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Typography>{items?.subTitle}</Typography>
                                    <Box
                                      sx={{
                                        position: 'absolute',
                                        right: 0,
                                      }}
                                    >
                                      <FormControlLabel
                                        control={<Checkbox />}
                                        label={items?.mainCheck}
                                      />
                                    </Box>
                                  </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                  {items?.fetaures?.map((feature) => {
                                    return (
                                      <>
                                        <FormGroup key={uuidv4()}>
                                          <FormControlLabel
                                            control={<Checkbox />}
                                            label={feature?.label}
                                          />
                                        </FormGroup>
                                      </>
                                    );
                                  })}
                                </AccordionDetails>
                              </Accordion>
                            </>
                          );
                        })}
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </>
              );
            })}
          </FormProvider>
        </Box>
      </CommonDrawer>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          padding: '1rem',
          boxShadow: '0px 1px 2px 0px #1018280F',
          borderRadius: '8px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h4">Roles and Rights</Typography>
          <Button
            variant="contained"
            sx={{
              display: 'flex',
              columnGap: '10px',
            }}
            onClick={() => setIsDraweropen(true)}
          >
            <AddCircleIcon
              sx={{
                color: `${theme?.palette?.common.white}`,
                fontSize: '16px',
              }}
            />
            Add New Role
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginTop: '2rem',
            marginBottom: '1rem',
          }}
        >
          <TextField
            placeholder="Search Here"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              border: `1px solid ${theme?.palette?.custom.dark}`,
              borderRadius: '4px',
              color: `${theme?.palette?.custom.main}`,
              display: 'flex',
              alignItems: 'center',
            }}
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
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>View</MenuItem>
            <MenuItem onClick={() => setIsOpenDelete(true)}>Delete</MenuItem>
          </Menu>
        </Box>
        <Grid>
          <TanstackTable columns={columns} data={rolesAndRightTableData} />
          <CustomPagination
            count={1}
            rowsPerPageOptions={[1, 2]}
            entriePages={1}
          />
        </Grid>
      </Box>
      <AlertModals
        message={'Are you sure you want to delete this role?'}
        type={'delete'}
        open={isOpenDelete}
        handleClose={() => setIsOpenDelete(false)}
        handleSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
};

export default RolesRight;
