import { Box, Grid, Skeleton } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { contactsDataArray } from './CreateContactsdata';
import useCreateContacts from './useCreateContacts';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';
import { API_STATUS } from '@/constants';

const CreateContacts = ({ open, onClose, handleRefresh }: any) => {
  const {
    orgId,
    loadingCreateContact,
    submitCreateContact,
    methodscontacts,
    contactOwnerData,
    lifeCycleStagesData,
    contactStatusData,
    reset,
    form,
    getDynamicFieldsStatus,
  } = useCreateContacts(handleRefresh);

  const handelClose = () => {
    onClose();
    reset();
  };

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={handelClose}
      title="Create Contact"
      footer
      okText="Create"
      submitHandler={submitCreateContact(onClose)}
      isOk
      isLoading={loadingCreateContact}
    >
      <Box sx={{ pt: 2 }}>
        <FormProvider methods={methodscontacts}>
          <Grid container spacing={2}>
            {contactsDataArray(
              orgId,
              contactOwnerData,
              lifeCycleStagesData,
              contactStatusData,
            )?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : null}
                </item.component>
              </Grid>
            ))}
          </Grid>
          {getDynamicFieldsStatus?.status === API_STATUS?.PENDING ? (
            <>
              <Grid item xs={12}>
                <Skeleton
                  variant="rounded"
                  sx={{ width: '100%', height: '45px' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rounded"
                  sx={{ width: '100%', height: '45px' }}
                />
              </Grid>
            </>
          ) : (
            <>
              {form?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  {componentMap[item?.component] &&
                    createElement(componentMap[item?.component], {
                      ...item?.componentProps,
                      name: item?.componentProps?.label,
                      size: 'small',
                    })}
                </Grid>
              ))}
            </>
          )}
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default CreateContacts;
