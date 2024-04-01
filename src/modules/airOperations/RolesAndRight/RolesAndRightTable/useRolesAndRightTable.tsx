import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import {
  rolesListData,
  rolesListsColumnsFunction,
  rolesActionsDropdown,
} from './RolesAndRightTable.data';
import {
  NOTISTACK_VARIANTS,
  ROLES_ACTION_CONSTANTS,
} from '@/constants/strings';
import {
  rolesFormDefaultValues,
  rolesFormValidationSchema,
} from '../UpsertRoleAndRightForm/UpsertRoleAndRightForm.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const useRolesAndRightTable = () => {
  const [selectedRolesList, setSelectedRolesList] = useState([]);
  const [isRolesFilterDrawerOpen, setRolesFilterDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [rolesModalTitle, setRolesModalTitle] = useState('');
  const [isRolesModalOpen, setIsRolesModalOpen] = useState<boolean>(false);
  const [openDeleteModel, setOpenDeleteModel] = useState<boolean>(false);
  const [currentActionType, setCurrentActionType] = useState<string>('');

  const rolesMethods: any = useForm({
    resolver: yupResolver(rolesFormValidationSchema),
    defaultValues: rolesFormDefaultValues,
  });

  const handleOpenDrawer = () => {
    setRolesFilterDrawerOpen(true);
  };

  const handleCloseRole = () => {
    setIsRolesModalOpen(false);
  };

  const handleActionClick = (actionType: string) => {
    if (actionType === ROLES_ACTION_CONSTANTS?.DELETE) {
      if (selectedRolesList?.length > 1) {
        enqueueSnackbar(`Record deleted Successfully`, {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        setSelectedRolesList([]);
        return;
      }
      return setOpenDeleteModel(true);
    }

    if (selectedRolesList?.length > 1) {
      enqueueSnackbar(`Can't ${actionType} multiple records`, {
        variant: NOTISTACK_VARIANTS?.WARNING,
      });
      return;
    }

    if (actionType === ROLES_ACTION_CONSTANTS?.EDIT) {
      setRolesModalTitle(ROLES_ACTION_CONSTANTS?.ADD_NEW_ROLE);
    } else if (actionType === ROLES_ACTION_CONSTANTS?.VIEW) {
    }

    setCurrentActionType(actionType);
    setIsRolesModalOpen(true);
  };

  const handleAddRolesModal = (actionType: string, isOpen?: boolean) => {
    if (isOpen) {
      setRolesModalTitle(
        actionType === ROLES_ACTION_CONSTANTS?.ADD_NEW_ROLE
          ? ROLES_ACTION_CONSTANTS?.ADD_NEW_ROLE
          : actionType === ROLES_ACTION_CONSTANTS?.EDIT
          ? ROLES_ACTION_CONSTANTS?.ADD_NEW_ROLE
          : '',
      );

      setCurrentActionType(actionType);
      setIsRolesModalOpen(true);
    } else {
      setCurrentActionType('');
      setIsRolesModalOpen(false);
    }
  };

  const RolesListsColumns = rolesListsColumnsFunction(
    selectedRolesList,
    setSelectedRolesList,
    rolesListData,
  );

  const handleDelete = () => {
    setOpenDeleteModel(false);
    setSelectedRolesList([]);
    enqueueSnackbar('Record deleted Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  const handleDeleteClose = () => {
    setOpenDeleteModel(false);
    setSelectedRolesList([]);
  };

  const { handleSubmit, reset } = rolesMethods;

  const onSubmit = async () => {
    let successMessage = '';

    switch (currentActionType) {
      case ROLES_ACTION_CONSTANTS?.ADD_NEW_ROLE:
        successMessage = 'Role Added Successfully';
        break;
      case ROLES_ACTION_CONSTANTS?.EDIT:
        successMessage = 'Role Updated Successfully';
        break;
      default:
        successMessage = '';
    }

    enqueueSnackbar(successMessage, {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });

    reset(rolesFormDefaultValues);
    setIsRolesModalOpen(false);
  };

  const dropdownOptions = rolesActionsDropdown(handleActionClick);

  return {
    selectedRolesList,
    RolesListsColumns,
    dropdownOptions,
    handleActionClick,
    setSearchValue,
    searchValue,
    handleOpenDrawer,
    isRolesFilterDrawerOpen,
    setRolesFilterDrawerOpen,
    setIsRolesModalOpen,
    isRolesModalOpen,
    setRolesModalTitle,
    rolesModalTitle,
    handleAddRolesModal,
    openDeleteModel,
    setOpenDeleteModel,
    handleDelete,
    handleDeleteClose,
    handleCloseRole,
    onSubmit,
    handleSubmit,
    rolesMethods,
    currentActionType,
  };
};
