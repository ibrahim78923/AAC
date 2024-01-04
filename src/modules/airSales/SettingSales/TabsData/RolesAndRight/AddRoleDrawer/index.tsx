import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import useAddRoleDrawer from './useAddRoleDrawer';
import { dataArray } from './AddRoleDrawer.data';
import PermissionsAccordion from '../PermissionsAccordion';
import { FormProvider } from '@/components/ReactHookForm';

const AddRoleDrawer = (props: any) => {
  const { methods, theme } = useAddRoleDrawer();
  const { isDrawerOpen, onClose, getPermissionsData } = props;

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen?.isToggle}
      onClose={onClose}
      title={isDrawerOpen?.type === 'add' ? 'Add New Role' : 'User Role'}
      okText={isDrawerOpen?.type === 'add' ? 'Add' : 'Edit'}
      footer={
        isDrawerOpen?.type === 'add' || isDrawerOpen?.type === 'edit'
          ? true
          : false
      }
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
            sx={{
              fontWeight: 700,
              color: `${theme?.palette?.grey[600]}`,
              my: 1,
            }}
          >
            Permissions
            <span style={{ color: `${theme?.palette?.error?.main}` }}>*</span>
          </Typography>
          <PermissionsAccordion permissionsData={getPermissionsData} />
          {/* {permissionArr?.map((item) => {
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
                                          transform: `rotate(${expanded ? '270deg' : '0deg'
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
              })} */}
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default AddRoleDrawer;
