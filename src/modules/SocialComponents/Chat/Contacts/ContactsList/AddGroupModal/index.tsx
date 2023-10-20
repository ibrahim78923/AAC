import React from 'react';

import Image from 'next/image';

import { Box, Grid, Typography } from '@mui/material';

import CommonModal from '@/components/CommonModal';
import TanstackTable from '@/components/Tabel/TanstackTable';
import {
  FormProvider,
  RHFMultiSearchableSelect,
} from '@/components/ReactHookForm';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  addGroupDefaultValues,
  addGroupFiltersDataArray,
  addGroupValidationSchema,
  columns,
  participantsData,
} from './AddGroupModal.data';
import { AddGroupPropsI } from './AddGroup.interface';

import {
  AddRoundedImage,
  UserProfileAvatarImage,
  UserSenderImage,
} from '@/assets/images';

import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';

const AddGroupModal = ({
  isAddGroupModal,
  setIsAddGroupModal,
}: AddGroupPropsI) => {
  const methodsAddGroup = useForm({
    resolver: yupResolver(addGroupValidationSchema),
    defaultValues: addGroupDefaultValues,
  });

  const onSubmit = () => {
    setIsAddGroupModal(false);
  };

  const { handleSubmit } = methodsAddGroup;

  const getColumns = columns();

  return (
    <CommonModal
      open={isAddGroupModal}
      handleClose={() => setIsAddGroupModal(false)}
      handleSubmit={handleSubmit(onSubmit)}
      title="Create Group"
      okText="Create Group"
      footer={true}
      footerFill
    >
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Image src={AddRoundedImage} alt="upload" />
          <Typography variant="h6">Add Photo</Typography>
        </Box>
        <br />
        <FormProvider
          methods={methodsAddGroup}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={4}>
            {addGroupFiltersDataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component
                  {...item.componentProps}
                  size={'small'}
                  options={item?.options}
                >
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
            <Grid item xs={12} md={12}>
              <RHFMultiSearchableSelect
                name="participant"
                isCheckBox={true}
                label="Candidates"
                options={[
                  {
                    image: UserProfileAvatarImage,
                    value: 'JohnDoe',
                    label: 'John Doe',
                  },
                  {
                    image: UserSenderImage,
                    value: 'Andrew',
                    label: 'Andrew',
                  },
                  {
                    image: UserProfileAvatarImage,
                    value: 'RichardRobertson',
                    label: 'Richard robertson',
                  },
                  {
                    image: UserSenderImage,
                    value: 'Franksten',
                    label: 'Franksten',
                  },
                ]}
              />
            </Grid>
          </Grid>
        </FormProvider>
        <br />
        <TanstackTable columns={getColumns} data={participantsData} />
      </>
    </CommonModal>
  );
};

export default AddGroupModal;
