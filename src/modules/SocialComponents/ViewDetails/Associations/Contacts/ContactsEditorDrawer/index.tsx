import { Box, Grid, useTheme } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import { FormProvider } from '@/components/ReactHookForm';

import useContactsEditorDrawer from './useContactsEditorDrawer';
import {
  contactsDataArray,
  drawerButtonTitle,
  drawerTitle,
} from './ContactsEditorDrawer.data';

import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { AddPenIcon } from '@/assets/icons';
import { IMG_URL } from '@/config';
import { useEffect } from 'react';

const ContactsEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer, contactRecord, companyId } = props;
  const {
    handleSubmit,
    onSubmit,
    methodscontacts,
    lifeCycleStagesData,
    contactStatusData,
    handleImageChange,
    imagePreview,
    setImagePreview,
  } = useContactsEditorDrawer({
    openDrawer,
    contactRecord,
    setOpenDrawer,
    companyId,
  });
  const theme = useTheme();

  useEffect(() => {
    setImagePreview(`${IMG_URL}${contactRecord?.profilePicture?.url}`);
  }, [contactRecord?.profilePicture?.url]);

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => setOpenDrawer('')}
        title={drawerTitle[openDrawer]}
        okText={drawerButtonTitle[openDrawer]}
        isOk={true}
        footer={openDrawer === 'View' ? false : true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodscontacts}
            onSubmit={handleSubmit(onSubmit)}
          >
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
                      alt="selected"
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
            <Grid container spacing={4}>
              {contactsDataArray(
                openDrawer,
                lifeCycleStagesData,
                contactStatusData,
              )?.map((item: any) => (
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
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default ContactsEditorDrawer;
