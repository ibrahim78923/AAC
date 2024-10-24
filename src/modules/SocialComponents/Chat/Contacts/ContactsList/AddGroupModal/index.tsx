import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material';

import CommonModal from '@/components/CommonModal';
import TanstackTable from '@/components/Table/TanstackTable';
import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  addGroupDefaultValues,
  addGroupFiltersDataArray,
  addGroupValidationSchema,
  columns,
} from './AddGroupModal.data';
import { AddGroupPropsI } from './AddGroup.interface';
import { AddRoundedImage } from '@/assets/images';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import {
  useCreateNewGroupMutation,
  useLazyGetAllChatUsersByCompanyQuery,
} from '@/services/chat';
import CloseIcon from '@/assets/icons/shared/close-icon';

const AddGroupModal = ({
  isAddGroupModal,
  setIsAddGroupModal,
}: AddGroupPropsI) => {
  const methodsAddGroup = useForm({
    resolver: yupResolver(addGroupValidationSchema),
    defaultValues: addGroupDefaultValues,
  });

  const theme = useTheme();

  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = methodsAddGroup;

  const participantIds: any = watch('participant');
  const [participants, setParticipants] = useState([]);

  const [groupAdmins, setGroupAdmins] = useState<any>([]);
  const [imageToUpload, setImageToUpload] = useState<any>();
  const [imagePreview, setImagePreview] = useState<any>();

  useEffect(() => {
    if (participantIds) {
      setParticipants(participantIds);
    }
  }, [participantIds]);

  const [createNewGroup, { isLoading }] = useCreateNewGroupMutation();

  const handleRemoveParticipant = (_id: any) => {
    const updatedParticipantsIds = participants?.filter(
      (participantId: any) => participantId?._id !== _id,
    );
    setParticipants(updatedParticipantsIds);
  };

  const getColumns: any = columns(
    handleRemoveParticipant,
    groupAdmins,
    setGroupAdmins,
  );

  useEffect(() => {
    setValue('image', imagePreview);
  }, [imagePreview]);

  const formData = new FormData();
  const onSubmit = async (values: any) => {
    const participantIds: any = participants?.map(
      (participant: any) => participant?._id,
    );
    formData.append('participants', participantIds);
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
    if (selectedImage && selectedImage instanceof File) {
      setImageToUpload(selectedImage);

      if (formData instanceof FormData) {
        formData?.append('groupImage', selectedImage);
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader?.result);
      };

      reader.readAsDataURL(selectedImage);
    }
  };

  const apiQueryUsers = useLazyGetAllChatUsersByCompanyQuery?.();

  const handelRemoveImage = () => {
    setImagePreview(null);
    setImageToUpload(null);
  };

  return (
    <CommonModal
      open={isAddGroupModal}
      handleClose={() => {
        setIsAddGroupModal(false);
        reset();
        handelRemoveImage();
      }}
      handleCancel={() => {
        setIsAddGroupModal(false);
        reset();
        handelRemoveImage();
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

          {imagePreview ? (
            <Box sx={{ position: 'relative' }}>
              <Image
                src={imagePreview}
                width={100}
                height={100}
                style={{ borderRadius: '50%' }}
                alt="selected image"
              />
              <IconButton
                onClick={() => handelRemoveImage()}
                sx={{
                  position: 'absolute',
                  top: '2px',
                  right: '5px',
                  background: theme?.palette?.common?.white,
                  boxShadow: '0px 0px 11px 0px rgb(0 0 0 / 24%)',
                }}
              >
                <CloseIcon size={[10, 11]} />
              </IconButton>
            </Box>
          ) : (
            <Image
              src={AddRoundedImage}
              alt="upload"
              style={{ cursor: 'pointer' }}
            />
          )}

          <label htmlFor="upload-group-image">
            <Typography sx={{ cursor: 'pointer' }} variant="h6">
              Add Photo
            </Typography>
          </label>
          {imagePreview ? null : (
            <Box sx={{ color: theme?.palette?.error?.main, fontSize: '14px' }}>
              {errors?.image?.message}
            </Box>
          )}
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
              <RHFAutocompleteAsync
                label={'Add Participant'}
                name={`participant`}
                fullWidth
                multiple
                apiQuery={apiQueryUsers}
                externalParams={{ limit: 1000, page: 1 }}
                size="small"
                placeholder="Select user"
                getOptionLabel={(option: any) => (
                  <>{`${option?.firstName} ${option?.lastName}`}</>
                )}
              />
            </Grid>
          </Grid>
        </FormProvider>
        <br />
        <Box
          sx={{
            maxHeight: '315px',
            overflow: 'scroll',
          }}
        >
          <TanstackTable columns={getColumns} data={participants} />
        </Box>
      </>
    </CommonModal>
  );
};

export default AddGroupModal;
