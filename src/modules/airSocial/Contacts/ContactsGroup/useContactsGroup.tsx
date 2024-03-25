import { useState } from 'react';
import {
  usePostGroupMutation,
  useGetGroupsQuery,
  // useUpdateGroupMutation,
  // useDeleteGroupMutation,
} from '@/services/commonFeatures/contact-groups';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createGroupDefaultValues,
  createGroupValidationSchema,
} from './CreateGroupModal/CreateGroupModal.data';
import { useGetContactsQuery } from '@/services/commonFeatures/contacts';

const useContactsGroup = () => {
  // Get Contacts
  const [searchValue, setSearchValue] = useState(null);
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const { data: dataGetContacts, isLoading: loadingGetContacts } =
    useGetContactsQuery({ params: searchPayLoad });

  // Get Groups
  const { data: dataGetContactGroups, isLoading: loadingGetGroups } =
    useGetGroupsQuery({});

  // Create Group
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Create');
  const [postCreateGroup, { isLoading: loadingCreateGroup }] =
    usePostGroupMutation();
  // const [updateGroup, { isLoading: loadingUpdateGroup }] = useUpdateGroupMutation();
  const methodsCreateGroup = useForm({
    resolver: yupResolver(createGroupValidationSchema),
    defaultValues: createGroupDefaultValues,
  });

  const { handleSubmit: handleMethodCreateGroup, reset: resetAddGroupForm } =
    methodsCreateGroup;

  const handleOpenModalCreate = (title: string, data: any) => {
    if (data != null) {
      methodsCreateGroup.setValue('name', data?.name);
      setSelectedUsers(data?.contacts.map((obj: any) => obj._id));
    }
    setModalTitle(title);
    setIsCreateModalOpen(true);
  };
  const handleCloseModalCreate = () => {
    setIsCreateModalOpen(false);
    resetAddGroupForm();
    setSelectedUsers([]);
  };

  const onSubmitCreatGroup = async (values: any) => {
    if (modalTitle === 'Create') {
      const payload = {
        name: values?.name,
        contactIds: selectedUsers,
      };
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
      // try {
      //   await updateGroup({ id: rowId, body: values })?.unwrap();
      //   handleCloseDrawerEditCall();
      //   setSelectedRow([]);
      //   enqueueSnackbar('Call has been updated successfully', {
      //     variant: 'success',
      //   });
      // } catch (error: any) {
      //   enqueueSnackbar('An error occured', {
      //     variant: 'error',
      //   });
      // }
    }
  };
  const handleCreateGroupSubmit = handleMethodCreateGroup(onSubmitCreatGroup);

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
    selectedUsers,
    setSelectedUsers,
    setSearchValue,
  };
};

export default useContactsGroup;
