import React from 'react';
import { Box, Grid } from '@mui/material';
import CommonModal from '@/components/CommonModal';
import { FormProvider } from '@/components/ReactHookForm';
import { columns, createGroupFiltersDataArray } from './CreateGroupModal.data';
import { v4 as uuidv4 } from 'uuid';
import TanstackTable from '@/components/Table/TanstackTable';

import Search from '@/components/Search';

const CreateGroupModal = ({
  title,
  isOpen,
  onClose,
  methods,
  onSubmit,
  contactList,
  loadingTable,
  setSelectedUsers,
  selectedUsers,
  setSearchValue,
  loadingPost,
}: any) => {
  const getColumns = columns({
    selectedUsers,
    setSelectedUsers,
    title,
  });

  return (
    <CommonModal
      open={isOpen}
      title={`${title} Group`}
      okText={title === 'Edit' ? 'Update' : 'Create'}
      footer={title !== 'View'}
      isSubmitDisabled={selectedUsers?.length < 2}
      handleClose={onClose}
      handleCancel={onClose}
      cancelText="Cancel"
      handleSubmit={onSubmit}
      isLoading={loadingPost}
    >
      <Box sx={{ maxHeight: 'calc(100vh - 180px)', overflowY: 'auto' }}>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {createGroupFiltersDataArray(title)?.map((item: any) => (
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
              <Box sx={{ mb: 2 }}>
                <Search
                  setSearchBy={setSearchValue}
                  label="Search By Name"
                  fullWidth
                  size="small"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <TanstackTable
                columns={getColumns}
                data={contactList}
                loading={loadingTable}
              />
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
    </CommonModal>
  );
};

export default CreateGroupModal;
