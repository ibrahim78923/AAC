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
import { participantsDataSelect } from '@/mock/modules/SocialComponents/Chat';
import { enqueueSnackbar } from 'notistack';
import {
  useCreateNewGroupMutation,
  useGetChatUsersQuery,
} from '@/services/chat';

const AddGroupModal = ({
  isAddGroupModal,
  setIsAddGroupModal,
}: AddGroupPropsI) => {
  const [setValues] = useState<any>([]);

  const methodsAddGroup = useForm({
    resolver: yupResolver(addGroupValidationSchema),
    defaultValues: addGroupDefaultValues,
  });

  const { handleSubmit, watch } = methodsAddGroup;

  const participantIds = watch('participant');

  const [participantsIdsValues, setParticipantsIdsValues] = useState<any>();
  const [groupAdmins, setGroupAdmins] = useState<any>([]);
  // const [imageToUpload, setImageToUpload] = useState<any>();

  const [createNewGroup] = useCreateNewGroupMutation();

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

  const filteredParticipants = participantsDataSelect
    ?.filter(
      (participant: any) => participantsIdsValues?.includes(participant?.id),
    )
    ?.map((participant: any) => ({
      id: participant?.id,
      participant: participant?.label,
    }));

  useEffect(() => {
    setParticipantsIdsValues(participantIds);
  }, [participantIds]);

  const formData = new FormData();

  const onSubmit = async (values: any) => {
    formData.append('participants', participantsIdsValues);
    formData.append('groupAdmins', groupAdmins);
    formData.append('groupName', values?.groupTitle);

    try {
      await createNewGroup({
        body: formData,
      })?.unwrap();
      enqueueSnackbar('successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occurred', {
        variant: 'error',
      });
    }
  };

  const handleImageChange = async (e: any) => {
    formData.append('groupImage', e?.target?.files[0]);
  };
  const { user }: { user: any } = getSession();

  const { data: chatsUsers } = useGetChatUsersQuery({
    params: {
      organization: user?.organization?._id,
      page: '1',
      limit: '20',
      role: user?.role,
    },
  });

  const transformedData = chatsUsers?.data?.users?.map((item: any) => ({
    id: item?._id,
    label: `${item?.firstName} ${item?.lastName}`,
    value: item._id,
    image: UserDefault,
  }));

  return (
    <CommonModal
      open={isAddGroupModal}
      handleClose={() => setIsAddGroupModal(false)}
      handleCancel={() => setIsAddGroupModal(false)}
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
          <input
            hidden={true}
            id="upload-group-image"
            type="file"
            accept="image/*"
            onChange={(e: any) => handleImageChange(e)}
          />
          <label htmlFor="upload-group-image">
            <Image
              src={AddRoundedImage}
              alt="upload"
              style={{ cursor: 'pointer' }}
            />
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
                options={transformedData ?? []}
              />
            </Grid>
          </Grid>
        </FormProvider>
        <br />
        {!isNullOrEmpty(filteredParticipants) && (
          <TanstackTable columns={getColumns} data={filteredParticipants} />
        )}
      </>
    </CommonModal>
  );
};

export default AddGroupModal;
