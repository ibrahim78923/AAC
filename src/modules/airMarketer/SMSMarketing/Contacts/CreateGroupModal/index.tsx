import React, { useState } from 'react';

import { Grid } from '@mui/material';

import CommonModal from '@/components/CommonModal';

import { FormProvider } from '@/components/ReactHookForm';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  columns,
  createGroupDefaultValues,
  createGroupFiltersDataArray,
  createGroupValidationSchema,
} from './CreateGroupModal.data';

import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import TanstackTable from '@/components/Table/TanstackTable';
import { smsMarketingContactsData } from '@/mock/modules/airMarketer/SMSMarketing/Contacts';
import Search from '@/components/Search';

const CreateGroupModal = ({ isCreateModalOpen, setIsCreateModalOpen }: any) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const methodsAddGroup = useForm({
    resolver: yupResolver(createGroupValidationSchema),
    defaultValues: createGroupDefaultValues,
  });

  const onSubmit = () => {
    // setIsAddGroupModal(false);
  };
  const { handleSubmit } = methodsAddGroup;

  const getColumns = columns({
    selectedUsers,
    setSelectedUsers,
    smsMarketingContactsData,
  });

  return (
    <CommonModal
      open={isCreateModalOpen}
      title={'Create Group'}
      okText={'Create'}
      footer={true}
      isSubmitDisabled={!selectedUsers?.length}
      handleClose={() => {
        setIsCreateModalOpen(false), setSelectedUsers([]);
      }}
      cancelText="Cancel"
      handleCancel={() => setIsCreateModalOpen(false)}
      handleSubmit={handleSubmit(onSubmit)}
    >
      <FormProvider methods={methodsAddGroup} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          {createGroupFiltersDataArray?.map((item: any) => (
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
            <Search
              searchBy={searchTerm}
              setSearchBy={setSearchTerm}
              label="Search By Name"
              fullWidth
              size="small"
              sx={{ marginBottom: '15px' }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TanstackTable
              columns={getColumns}
              data={smsMarketingContactsData}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </CommonModal>
  );
};

export default CreateGroupModal;
