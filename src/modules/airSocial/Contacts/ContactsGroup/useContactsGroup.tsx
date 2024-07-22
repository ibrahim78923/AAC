import { useEffect, useState } from 'react';
import {
  usePostGroupMutation,
  useGetGroupsQuery,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} from '@/services/commonFeatures/contact-groups';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createGroupDefaultValues,
  createGroupValidationSchema,
} from './CreateGroupModal/CreateGroupModal.data';
import { useGetContactsQuery } from '@/services/commonFeatures/contacts';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { useRouter } from 'next/router';
import { CONTACTS_CONSTANTS } from '@/constants/strings';

const useContactsGroup = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [filterParams, setFilterParams] = useState({});

  const router = useRouter();
  // Get Contacts
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const {
    data: dataGetContacts,
    isLoading: loadingGetContacts,
    refetch: refetchContacts,
  } = useGetContactsQuery({
    params: { ...filterParams, ...searchPayLoad },
  });
  useEffect(() => {
    if (isCreateModalOpen) {
      refetchContacts();
    }
  }, [isCreateModalOpen]);

  useEffect(() => {
    if (router?.pathname === AIR_MARKETER?.WHATSAPP_MARKETING) {
      setFilterParams({ numberType: CONTACTS_CONSTANTS?.WHATSAPP_NUMBER });
    } else if (router?.pathname === AIR_MARKETER?.SMS_MARKETING) {
      setFilterParams({ numberType: CONTACTS_CONSTANTS?.PHONE_NUMBER });
    }
  }, [router?.pathname]);

  // Get Groups
  const { data: dataGetContactGroups, isLoading: loadingGetGroups } =
    useGetGroupsQuery({ params: filterParams });

  // Create Group
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [modalTitle, setModalTitle] = useState('Create');
  const [postCreateGroup, { isLoading: loadingCreateGroup }] =
    usePostGroupMutation();
  const [updateGroup, { isLoading: loadingUpdateGroup }] =
    useUpdateGroupMutation();
  const methodsCreateGroup = useForm({
    resolver: yupResolver(createGroupValidationSchema),
    defaultValues: createGroupDefaultValues,
  });

  const { handleSubmit: handleMethodCreateGroup, reset: resetAddGroupForm } =
    methodsCreateGroup;

  const handleOpenModalCreate = (title: string, data: any) => {
    if (data != null) {
      setGroupId(data?._id);
      methodsCreateGroup.setValue('name', data?.name);
      setSelectedUsers(data?.contacts.map((obj: any) => obj._id));
    }
    setModalTitle(title);
    setIsCreateModalOpen(true);
  };
  const handleCloseModalCreate = () => {
    setIsCreateModalOpen(false);
    resetAddGroupForm();
    setSearchValue(null);
    setSelectedUsers([]);
  };

  const onSubmitCreatGroup = async (values: any) => {
    const payload = {
      name: values?.name,
      contactIds: selectedUsers,
    };
    if (modalTitle === 'Create') {
      try {
        await postCreateGroup({ body: payload })?.unwrap();
        handleCloseModalCreate();
        enqueueSnackbar('Group created successfully', {
          variant: 'success',
        });
        setSelectedUsers([]);
      } catch (error: any) {
        enqueueSnackbar('An error occured', {
          variant: 'error',
        });
      }
    }
    if (modalTitle === 'Edit') {
      try {
        await updateGroup({ id: groupId, body: payload })?.unwrap();
        handleCloseModalCreate();
        enqueueSnackbar('Group updated successfully', {
          variant: 'success',
        });
      } catch (error: any) {
        enqueueSnackbar('An error occured', {
          variant: 'error',
        });
      }
    }
  };
  const handleCreateGroupSubmit = handleMethodCreateGroup(onSubmitCreatGroup);

  // Delete Group
  const [isGroupAlert, setIsGroupAlert] = useState(false);
  const [deleteGroup, { isLoading: loadingDelete }] = useDeleteGroupMutation();
  const handleOpenAlertDelete = (groupId: any) => {
    setGroupId(groupId);
    setIsGroupAlert(true);
  };
  const handleCloseAlertDelete = () => {
    setIsGroupAlert(false);
  };

  const handleDeleteGroup = async () => {
    try {
      await deleteGroup(groupId)?.unwrap();
      handleCloseAlertDelete();
      enqueueSnackbar('Group has been deleted.', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  return {
    loadingGetContacts,
    dataGetContacts,
    loadingGetGroups,
    dataGetContactGroups,
    isCreateModalOpen,
    modalTitle,
    handleOpenModalCreate,
    handleCloseModalCreate,
    methodsCreateGroup,
    handleCreateGroupSubmit,
    loadingCreateGroup,
    loadingUpdateGroup,
    selectedUsers,
    setSelectedUsers,
    setSearchValue,
    isGroupAlert,
    handleOpenAlertDelete,
    handleCloseAlertDelete,
    handleDeleteGroup,
    loadingDelete,
  };
};

export default useContactsGroup;
