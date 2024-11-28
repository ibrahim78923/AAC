import { Box, Grid, useTheme } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import {
  FormProvider,
  RHFRadioGroup,
  RHFSelect,
} from '@/components/ReactHookForm';

import useContactsEditorDrawer from './useContactsEditorDrawer';
import { contactsDataArray, drawerTitle } from './ContactsEditorDrawer.data';

import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { AddPenIcon } from '@/assets/icons';
import { useEffect } from 'react';
import { generateImage } from '@/utils/avatarUtils';
import { DRAWER_TITLE, associationCompanies } from '@/constants';

const ContactsEditorDrawer = (props: any) => {
  const {
    openDrawer,
    setOpenDrawer,
    contactRecord,
    companyId,
    existingContactData,
    newArray,
  } = props;
  const {
    handleSubmit,
    onSubmit,
    methodscontacts,
    lifeCycleStagesData,
    contactStatusData,
    handleImageChange,
    imagePreview,
    setImagePreview,
    watchContactStatus,
    isLoadingPostContact,
    isLoadingUpdateContact,
  } = useContactsEditorDrawer({
    openDrawer,
    contactRecord,
    setOpenDrawer,
    companyId,
    newArray,
  });
  const theme = useTheme();

  useEffect(() => {
    setImagePreview(generateImage(contactRecord?.profilePicture?.url));
  }, [contactRecord?.profilePicture?.url]);

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => setOpenDrawer('')}
        title={drawerTitle[openDrawer]}
        okText={'Add'}
        isOk={true}
        footer={openDrawer === 'View' ? false : true}
        submitHandler={handleSubmit(onSubmit)}
        isLoading={isLoadingPostContact || isLoadingUpdateContact}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodscontacts}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} sx={{ paddingTop: '20px !important' }}>
                {watchContactStatus[0] === associationCompanies?.newContacts &&
                  openDrawer != DRAWER_TITLE?.VIEW && (
                    <RHFRadioGroup
                      options={[
                        { value: 'New Contact', label: 'New Contact' },
                        {
                          value: 'Existing Contacts',
                          label: 'Existing Contacts',
                        },
                      ]}
                      name={'contactStatus'}
                      row={true}
                    />
                  )}
              </Grid>

              {watchContactStatus[0] === associationCompanies?.newContacts && (
                <Grid item xs={12}>
                  <center>
                    <Box sx={{ position: 'relative' }}>
                      <Box
                        sx={{
                          border: `1px solid ${theme?.palette?.grey[700]}`,
                          borderRadius: '100px',
                          width: '120px',
                          height: '120px',
                          boxShadow: `0px 2px 4px -2px ${theme?.palette?.custom?.dark_shade_green},
                    5px 5px 9px -2px ${theme?.palette?.custom?.shade_grey}`,
                        }}
                      >
                        {imagePreview && (
                          <Image
                            src={imagePreview}
                            alt=""
                            width={120}
                            height={120}
                            style={{ borderRadius: '50%' }}
                          />
                        )}
                      </Box>
                      <input
                        hidden={true}
                        id="upload-group-image"
                        type="file"
                        accept="image/*"
                        onChange={(e: any) => handleImageChange(e)}
                      />
                      <label htmlFor="upload-group-image">
                        <Box
                          sx={{
                            position: 'absolute',
                            right: '165px',
                            bottom: 0,
                            cursor: 'pointer',
                          }}
                        >
                          <AddPenIcon />
                        </Box>
                      </label>
                    </Box>
                  </center>
                </Grid>
              )}

              {contactsDataArray(
                openDrawer,
                lifeCycleStagesData,
                contactStatusData,
              )?.map((item: any, index: any) =>
                watchContactStatus[0] === associationCompanies?.newContacts ? (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
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
                ) : (
                  index === associationCompanies?.zero && (
                    <Grid
                      item
                      xs={12}
                      md={item?.md}
                      key={uuidv4()}
                      sx={{ paddingTop: '0px !important' }}
                    >
                      <RHFRadioGroup
                        options={[
                          { value: 'New Contact', label: 'New Contact' },
                          {
                            value: 'Existing Contacts',
                            label: 'Existing Contacts',
                          },
                        ]}
                        name={'contactStatus'}
                        row={true}
                      />
                      <RHFSelect size="small" name="existingContact">
                        {existingContactData?.map((option: any) => (
                          <option key={uuidv4()} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                      </RHFSelect>
                    </Grid>
                  )
                ),
              )}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default ContactsEditorDrawer;
