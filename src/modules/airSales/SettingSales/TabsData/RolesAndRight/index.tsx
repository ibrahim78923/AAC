import {
  Box,
  Typography,
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Stack,
} from '@mui/material';

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
import Search from '@/components/Search';
import ActionButton from './ActionButton';

const RolesRight = () => {
  const {
    handleCloseDrawer,
    setIsDraweropen,
    setIsOpenDelete,
    setCheckedRows,
    handleChange,
    isDraweropen,
    isOpenDelete,
    checkedRows,
    expanded,
    methods,
    theme,
  } = useRoleAndRight();

  const columnsProps = {
    checkedRows: checkedRows,
    setCheckedRows: setCheckedRows,
  };
  const columnParams = columns(columnsProps);

  return (
    <>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          padding: '1rem',
          boxShadow: '0px 1px 2px 0px #1018280F',
          borderRadius: '8px',
        }}
      >
        <Stack
          direction={{ sm: 'row', xs: 'column' }}
          justifyContent="space-between"
          gap={1}
        >
          <Typography variant="h3">Roles and Rights</Typography>
          <Button
            className="small"
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={() => setIsDraweropen({ isToggle: true, type: 'add' })}
          >
            Add New Role
          </Button>
        </Stack>
        <Stack
          direction={{ sm: 'row', xs: 'column' }}
          justifyContent="space-between"
          gap={1}
          my={2}
        >
          <Search placeholder="Search by Role Name" size="small" />

          <ActionButton
            checkedRows={checkedRows}
            setIsDraweropen={setIsDraweropen}
            setIsOpenDelete={setIsOpenDelete}
          />
        </Stack>
        <Grid>
          <TanstackTable columns={columnParams} data={rolesAndRightTableData} />
          <CustomPagination
            count={1}
            rowsPerPageOptions={[1, 2]}
            entriePages={1}
          />
        </Grid>
      </Box>

      {isOpenDelete && (
        <AlertModals
          message={'Are you sure you want to delete this role?'}
          type={'delete'}
          open={isOpenDelete}
          handleClose={() => setIsOpenDelete(false)}
          handleSubmit={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      )}

      {isDraweropen?.isToggle && (
        <CommonDrawer
          isDrawerOpen={isDraweropen?.isToggle}
          onClose={handleCloseDrawer}
          title={isDraweropen?.type === 'add' ? 'Add New Role' : 'User Role'}
          okText={'Add'}
          footer={true}
          isOk={true}
        >
          <Box sx={{ paddingTop: '1rem' }}>
            <FormProvider methods={methods}>
              <Grid container spacing={2}>
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
                <span style={{ color: `${theme?.palette?.error?.main}` }}>
                  *
                </span>
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
      )}
    </>
  );
};

export default RolesRight;
