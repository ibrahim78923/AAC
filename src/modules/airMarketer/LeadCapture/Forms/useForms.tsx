import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { useTheme } from '@mui/material';
import {
  addFormDefaultValues,
  addFormvalidationSchema,
} from './AddDrawer/AddDrawer.data';
import { PAGINATION } from '@/config';
import {
  useGetLeadCaptureFormQuery,
  useDeleteLeadCaptureFormMutation,
  usePostLeadCaptureFormMutation,
} from '@/services/airMarketer/lead-capture/forms';
import { enqueueSnackbar } from 'notistack';
import { tabsArray } from './Forms.data';
import { formMode, formStatus } from '@/constants/form-builder';
interface FormValues {
  name: string;
}

const useForms = () => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [findStatus, setFindStatus] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const theme = useTheme();
  const handleActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selectedRow, setSelectedRow]: any = useState([]);
  const [selectedRowStatus, setSelectedRowStatus]: any = useState(null);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchValue, setSearchValue] = useState(null);
  const [filterParams, setFilterParams] = useState({});
  const paginationParams = {
    page: page,
    limit: pageLimit,
  };

  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }

  const defaultTabValue: any = tabsArray[0].value;
  const [tabValue, setTabValue] = useState(defaultTabValue);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    setSelectedRow([]);
    const filterPayload: any = {};
    if (newValue === defaultTabValue) {
      filterPayload.status = undefined;
    } else {
      filterPayload.status = newValue;
    }
    setFilterParams(filterPayload);
    setPage(PAGINATION?.CURRENT_PAGE);
    setPageLimit(PAGINATION?.PAGE_LIMIT);
    setSearchValue(null);
  };

  const {
    data: dataGetForms,
    isLoading: loadingGetForms,
    isFetching: fetchingGetForms,
  } = useGetLeadCaptureFormQuery({
    params: { ...searchPayLoad, ...paginationParams, ...filterParams },
  });

  // Add Form Drawer
  const [postAddForm, { isLoading: loadingAddForm }] =
    usePostLeadCaptureFormMutation();
  const [isAddDraweropen, setIsAddDraweropen] = useState(false);
  const methodsAddForm = useForm({
    resolver: yupResolver(addFormvalidationSchema),
    defaultValues: addFormDefaultValues,
  });
  const { handleSubmit: handleMethodAddForm, reset: resetAddForm } =
    methodsAddForm;

  const handleOpenAddDrawer = () => {
    setIsAddDraweropen(true);
  };
  const handleCloseAddDrawer = () => {
    setIsAddDraweropen(false);
    resetAddForm();
  };

  const handleClickEdit = (id: string) => {
    router.push({
      pathname: AIR_MARKETER.CREATE_FORM,
      query: { formId: id, mode: formMode?.edit },
    });
  };

  const onSubmitAddForm: any = async (values: FormValues) => {
    const { name } = values;
    const payload: any = {
      status: formStatus?.draft,
      name,
    };

    try {
      const response = await postAddForm({ body: payload })?.unwrap();
      const formId = response?.data?._id;
      handleCloseAddDrawer();
      enqueueSnackbar('Form created successfully as draft', {
        variant: 'success',
      });
      handleClickEdit(formId);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleAddFormSubmit = handleMethodAddForm(onSubmitAddForm);

  // Delete Forms
  const [deleteForm, { isLoading: loadingDelete }] =
    useDeleteLeadCaptureFormMutation();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = () => {
    setOpenModalDelete(true);
  };
  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleDeleteForm = async () => {
    const formIds = await selectedRow?.join(',');
    try {
      await deleteForm({ ids: formIds })?.unwrap();
      handleCloseModalDelete();
      enqueueSnackbar('Form has been deleted.', {
        variant: 'success',
      });
      setSelectedRow([]);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  // Modal export
  const [openModalExport, setOpenModalExport] = useState(false);
  const handleOpenModalExport = () => {
    setOpenModalExport(true);
  };
  const handleCloseModalExport = () => {
    setOpenModalExport(false);
  };

  return {
    selectedRow,
    setSelectedRow,
    selectedRowStatus,
    setSelectedRowStatus,
    setSearchValue,
    loadingGetForms,
    fetchingGetForms,
    dataGetForms,
    searchValue,
    setPageLimit,
    setPage,
    tabValue,
    handleChangeTabs,

    isAddDraweropen,
    handleOpenAddDrawer,
    handleCloseAddDrawer,
    handleAddFormSubmit,
    methodsAddForm,
    loadingAddForm,

    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteForm,
    loadingDelete,

    openModalExport,
    handleOpenModalExport,
    handleCloseModalExport,

    showSignUpForm,
    setShowSignUpForm,
    router,
    handleActionsClick,
    open,
    handleClose,
    anchorEl,
    handleClickEdit,

    findStatus,
    setFindStatus,
    theme,
  };
};

export default useForms;
