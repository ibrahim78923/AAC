import React, { useEffect, useState } from 'react';

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
import {
  useGetChatUsersByCompanyQuery,
  useUpdateChatMutation,
} from '@/services/chat';
import { PAGINATION } from '@/config';
import { getSession } from '@/utils';
import { UserDefault } from '@/assets/images';
import { enqueueSnackbar } from 'notistack';
import { useAppSelector } from '@/redux/store';
import { setActiveConversation } from '@/redux/slices/chat/slice';
import { useDispatch } from 'react-redux';

const AddMembers = ({
  setIsAddMembers,
  setIsLoadingAddParticipant,
}: AddMembersPropsI) => {
  const methodsAddGroup: any = useForm({
    resolver: yupResolver(addMembersValidationSchema),
    defaultValues: addMembersDefaultValues,
  });

  const onSubmit = () => {};

  const dispatch = useDispatch();

  const { handleSubmit, watch } = methodsAddGroup;

  const participantsToAdd = watch('participant');

  const { user }: { user: any } = getSession();

  const [currentPage, setCurrentPage] = useState(PAGINATION?.CURRENT_PAGE);
  const pageLimit = PAGINATION?.PAGE_LIMIT;
  const [searchValue, setSearchValue] = useState('');

  const [response, setResponse] = useState<any>({});

  const { data: chatsUsers, status } = useGetChatUsersByCompanyQuery({
    params: {
      page: currentPage,
      limit: pageLimit,
      search: searchValue,
    },
  });

  const transformedData = chatsUsers?.data?.usercompanyaccounts?.map(
    (item: any) => ({
      id: item?._id,
      label: `${item?.firstName} ${item?.lastName}`,
      value: item?._id,
      image: UserDefault,
    }),
  );

  const exceptCurrentUser =
    transformedData &&
    transformedData?.filter((item: any) => item?.id !== user?._id);

  const activeConversation: any = useAppSelector(
    (state) => state?.chat?.activeConversation,
  );

  const filteredParticipants = exceptCurrentUser?.filter(
    (item: any) =>
      !activeConversation?.participants?.find(
        (participant: any) => participant?._id === item?.id,
      ),
  );

  useEffect(() => {
    if (Object.keys(response)?.length) {
      dispatch(
        setActiveConversation({
          ...activeConversation,
          participants: response?.data?.participants,
        }),
      );
      setIsAddMembers(false);
    }
  }, [response]);

  const [updateChat, { isLoading }] = useUpdateChatMutation();
  const updateChatHandler = async () => {
    const payload = {
      participants: participantsToAdd ? participantsToAdd : [],
    };
    try {
      const apiResponse = await updateChat({
        body: payload,
        id: activeConversation?._id,
      })?.unwrap();
      enqueueSnackbar('User added successfully', {
        variant: 'success',
      });
      setResponse(apiResponse);
    } catch (error: any) {
      enqueueSnackbar('An error occurred while adding participants', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    setIsLoadingAddParticipant(isLoading);
  }, [isLoading]);

  return (
    <FormProvider methods={methodsAddGroup} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <RHFMultiSearchableSelect
            name="participant"
            isCheckBox={true}
            label="Add Participant"
            size="small"
            options={filteredParticipants ?? []}
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
            footerActionHandler={updateChatHandler}
            setIsDropdownClose={setIsAddMembers}
            isFooterActionLoading={isLoading}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default AddMembers;
