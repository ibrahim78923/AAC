import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { Box, Grid, Typography } from '@mui/material';

import CommonModal from '@/components/CommonModal';
import TanstackTable from '@/components/Table/TanstackTable';
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
} from './AddGroupModal.data';
import { AddGroupPropsI } from './AddGroup.interface';

import { AddRoundedImage, UserDefault } from '@/assets/images';

import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { getSession, isNullOrEmpty } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import {
  useCreateNewGroupMutation,
  useGetChatUsersQuery,
} from '@/services/chat';
import { PAGINATION } from '@/config';

const AddGroupModal = ({
  isAddGroupModal,
  setIsAddGroupModal,
}: AddGroupPropsI) => {
  const [setValues] = useState<any>([]);

  const methodsAddGroup = useForm({
    resolver: yupResolver(addGroupValidationSchema),
    defaultValues: addGroupDefaultValues,
  });

  const { handleSubmit, watch, reset } = methodsAddGroup;

  const participantIds = watch('participant');

  const [participantsIdsValues, setParticipantsIdsValues] = useState<any>();
  const [groupAdmins, setGroupAdmins] = useState<any>([]);
  const [imageToUpload, setImageToUpload] = useState<any>();
  const [imagePreview, setImagePreview] = useState<any>();

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

  const [createNewGroup, { isLoading }] = useCreateNewGroupMutation();

  const handleRemoveParticipant = (id: any) => {
    const updatedParticipantsIds = participantsIdsValues?.filter(
      (participantId: any) => participantId !== id,
    );
    setParticipantsIdsValues(updatedParticipantsIds);
  };

  const getColumns = columns(
    handleRemoveParticipant,
    groupAdmins,
    setGroupAdmins,
  );

  const filteredParticipants = transformedData
    ?.filter(
      (participant: any) => participantsIdsValues?.includes(participant?.id),
    )
    ?.map((participant: any) => ({
      id: participant?.id,
      participant: participant?.label,
    }));

  const exceptCurrentUser =
    transformedData &&
    transformedData?.filter((item: any) => item?.id !== user?._id);

  useEffect(() => {
    setParticipantsIdsValues(participantIds);
  }, [participantIds]);

  const formData = new FormData();

  const onSubmit = async (values: any) => {
    formData.append('participants', participantsIdsValues);
    formData.append('groupAdmins', groupAdmins);
    formData.append('groupName', values?.groupTitle);
    formData.append('groupImage', imageToUpload);

    try {
      await createNewGroup({
        body: formData,
      })?.unwrap();
      enqueueSnackbar('Group created successfully', {
        variant: 'success',
      });
      setIsAddGroupModal(false);
      setImagePreview(null);
      setImageToUpload(null);
      reset();
    } catch (error: any) {
      enqueueSnackbar('An error occurred', {
        variant: 'error',
      });
    }
  };
  const handleImageChange = async (e: any) => {
    const selectedImage = e?.target?.files[0];
    setImageToUpload(selectedImage);
    formData?.append('groupImage', selectedImage);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader?.result);
    };
    reader?.readAsDataURL(selectedImage);
  };

  return (
    <CommonModal
      open={isAddGroupModal}
      handleClose={() => {
        setIsAddGroupModal(false);
        reset();
      }}
      handleCancel={() => {
        setIsAddGroupModal(false);
        reset();
      }}
      handleSubmit={handleSubmit(onSubmit)}
      title="Create Group"
      okText="Create Group"
      footer={true}
      footerFill
      isLoading={isLoading}
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
          <input
            hidden={true}
            id="upload-group-image"
            type="file"
            accept="image/*"
            onChange={(e: any) => handleImageChange(e)}
          />
          <label htmlFor="upload-group-image">
            {imagePreview ? (
              <Image
                src={imagePreview}
                width={100}
                height={100}
                style={{ borderRadius: '50%' }}
                alt="selected image"
              />
            ) : (
              <Image
                src={AddRoundedImage}
                alt="upload"
                style={{ cursor: 'pointer' }}
              />
            )}
            <Typography sx={{ cursor: 'pointer' }} variant="h6">
              Add Photo
            </Typography>
          </label>
        </Box>

        <br />
        <FormProvider
          methods={methodsAddGroup}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
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
                label="Add Participant"
                size="small"
                setValues={setValues}
                options={exceptCurrentUser ?? []}
                isPagination={true}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={chatsUsers?.data?.meta?.pages}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                customSearch={true}
                isLoading={status === 'pending' ? true : false}
              />
            </Grid>
          </Grid>
        </FormProvider>
        <br />
        {!isNullOrEmpty(filteredParticipants) && (
          <Box
            sx={{
              maxHeight: '315px',
              overflow: 'scroll',
            }}
          >
            <TanstackTable columns={getColumns} data={filteredParticipants} />
          </Box>
        )}
      </>
    </CommonModal>
  );
};

export default AddGroupModal;
