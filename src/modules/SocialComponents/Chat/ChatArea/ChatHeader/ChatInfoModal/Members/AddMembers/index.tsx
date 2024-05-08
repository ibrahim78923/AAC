import React, { useState } from 'react';

import { Grid } from '@mui/material';

import {
  FormProvider,
  RHFMultiSearchableSelect,
} from '@/components/ReactHookForm';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  addMembersDefaultValues,
  addMembersValidationSchema,
} from './AddMembers.data';

import { AddMembersPropsI } from './AddMembers.interface';

import { useForm } from 'react-hook-form';
import { useGetChatUsersQuery } from '@/services/chat';
import { PAGINATION } from '@/config';
import { getSession } from '@/utils';
import { UserDefault } from '@/assets/images';

const AddMembers = ({ setIsAddMembers }: AddMembersPropsI) => {
  const methodsAddGroup = useForm({
    resolver: yupResolver(addMembersValidationSchema),
    defaultValues: addMembersDefaultValues,
  });

  const onSubmit = () => {};

  const { handleSubmit } = methodsAddGroup;

  const { user }: { user: any } = getSession();

  const [currentPage, setCurrentPage] = useState(PAGINATION?.CURRENT_PAGE);
  const pageLimit = PAGINATION?.PAGE_LIMIT;
  const [searchValue, setSearchValue] = useState('');

  const { data: chatsUsers, status } = useGetChatUsersQuery({
    params: {
      organization: user?.organization?._id,
      page: currentPage,
      limit: pageLimit,
      role: user?.role,
      search: searchValue,
    },
  });
  const transformedData = chatsUsers?.data?.users?.map((item: any) => ({
    id: item?._id,
    label: `${item?.firstName} ${item?.lastName}`,
    value: item?._id,
    image: UserDefault,
  }));

  const exceptCurrentUser =
    transformedData &&
    transformedData?.filter((item: any) => item?.id !== user?._id);

  return (
    <FormProvider methods={methodsAddGroup} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <RHFMultiSearchableSelect
            name="participant"
            isCheckBox={true}
            label="Add Participant"
            size="small"
            // setValues={setValues}
            options={exceptCurrentUser ?? []}
            isPagination={true}
            defaultOpen={true}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={chatsUsers?.data?.meta?.pages}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            customSearch={true}
            isLoading={status === 'pending' ? true : false}
            isFooter={true}
            footerText="Add"
            footerActionHandler={() => alert('Add')}
            setIsDropdownClose={setIsAddMembers}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default AddMembers;
