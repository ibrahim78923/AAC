import React from 'react';
import { Box, Checkbox, Grid, Typography } from '@mui/material';

import CommonModal from '@/components/CommonModal';

import {
  FormProvider,
  RHFMultiSearchableSelect,
} from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  addGroupDefaultValues,
  addGroupFiltersDataArray,
  addGroupValidationSchema,
} from './AddGroupModal.data';
import { AddGroupPropsI } from './AddGroup.interface';

import { v4 as uuidv4 } from 'uuid';
import TanstackTable from '@/components/Tabel/TanstackTable';
import { AddRoundedImage } from '@/assets/images';
import Image from 'next/image';

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

  const participantsData = [
    {
      id: '01',
      participant: 'jhon',
    },
  ];

  const columns = () => {
    return [
      {
        accessorFn: (row: any) => row.id,
        id: 'id',
        cell: (info: any) => (
          <Checkbox color="primary" name={info.getValue()} />
        ),
        header: 'Group Admin',
        isSortable: false,
      },
      {
        accessorFn: (row: any) => row.participant,
        id: 'participant',
        isSortable: false,
        header: 'participant',
        cell: (info: any) => info.getValue(),
      },
      {
        id: 'Remove Participant',
        isSortable: false,
        header: 'Remove Participant',
        cell: () => <Box>Remove</Box>,
      },
    ];
  };

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
                    image:
                      'https://cdn-icons-png.flaticon.com/512/236/236831.png',
                    value: 'JohnDoe',
                    label: 'John Doe',
                  },
                  {
                    image:
                      'https://cdn-icons-png.flaticon.com/512/219/219956.png',
                    value: 'Andrew',
                    label: 'Andrew',
                  },
                  {
                    image:
                      'https://cdn-icons-png.flaticon.com/512/236/236831.png',
                    value: 'RichardRobertson',
                    label: 'Richard robertson',
                  },
                  {
                    image:
                      'https://cdn-icons-png.flaticon.com/512/219/219956.png',
                    value: 'Franksten',
                    label: 'Franksten',
                  },
                ]}
              />
            </Grid>
          </Grid>
        </FormProvider>
        <br />
        <TanstackTable columns={columns()} data={participantsData} />
      </>
    </CommonModal>
  );
};

export default AddGroupModal;
