import React, { useState } from 'react';

// import { useForm } from 'react-hook-form';

import { Theme, useTheme } from '@mui/material';

// import { yupResolver } from '@hookform/resolvers/yup';

// import {
//   // dealPipelinesDefaultValues,
//   dealPipelinesvalidationSchema,
// } from './DealPipelines.data';

import {
  useDeleteDealsPipelineMutation,
  useGetDealsPipelineQuery,
  // useLazyGetDealsPipelineByIdQuery,
  usePostDealsPipelineMutation,
  useUpdateDealsPipelineMutation,
} from '@/services/airSales/deals/settings/deals-pipeline';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useDealPipelines = () => {
  const theme = useTheme<Theme>();
  const [isDraweropen, setIsDraweropen] = useState({
    isToggle: false,
    type: 'add',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productSearch, setproductSearch] = useState<string>('');
  const [isDisableButton, setDisableButton] = useState(false);
  const [isdefaultValue, setdefaultValue] = useState(false);
  // const [inputFields, setInputFields] = useState([
  //   { name: 'New', probability: null },
  //   { name: 'Lost', probability: null },
  //   { name: 'Won', probability: null },
  // ]);

  const [checkedDeal, setCheckedDeal] = useState<string[]>([]);
  // const [selectedPipelines, setSelectedPipelines] = useState<any>([]);
  // const [Loading, setLoading] = useState(false);

  const [postDealsPipeline, { isLoading: postDealLoading }] =
    usePostDealsPipelineMutation();
  const [deleteDealsPipeline, { isLoading: deleteDealLoading }] =
    useDeleteDealsPipelineMutation();
  const [updateDealsPipeline] = useUpdateDealsPipelineMutation();

  // const [trigger, { data: pipelineById }] = useLazyGetDealsPipelineByIdQuery();

  // const DefaultValues: any = {
  //   pipelineName: '',
  //   defaultPipeline: false,
  //   probability: null
  // };

  // const dealPipelines = useForm({
  //   resolver: yupResolver(dealPipelinesvalidationSchema),
  //   defaultValues: DefaultValues,
  // });
  // const { handleSubmit, reset, setValue } = dealPipelines;

  // useEffect(() => {
  //   trigger(checkedDeal);
  // }, [checkedDeal]);

  // useEffect(() => {
  //   const data = pipelineById?.data[0];

  //   const fieldsToSet: any = {
  //     pipelineName: data?.name,
  //     defaultPipeline: data?.isDefault,
  //     stages: data?.stages?.map((item: any) => ({
  //       name: item?.name,
  //       probability: item?.probability,
  //     })),
  //   };
  //   for (const key in fieldsToSet) {
  //     setValue(key, fieldsToSet[key]);
  //   }
  // }, [pipelineById]);

  const paramsObj: any = {};
  if (productSearch) paramsObj['search'] = productSearch;
  const query = '&' + new URLSearchParams(paramsObj)?.toString();

  const { data, isLoading } = useGetDealsPipelineQuery({
    query,
    meta: false,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // reset();
  };

  const handleCloseDrawer = () => {
    setIsDraweropen({ isToggle: false, type: '' });
    // reset();
  };

  const onSubmit = async (values: any) => {
    const payload = {
      name: values?.pipelineName,
      isDefault: values?.defaultPipeline,
      dealStages: values?.dealStages,
    };

    try {
      // setLoading(true);
      if (isDraweropen?.type === 'add') {
        await postDealsPipeline({ body: payload })?.unwrap();
        // reset();
      } else {
        await updateDealsPipeline({ id: checkedDeal, body: payload });
      }
      setIsDraweropen({ isToggle: false, type: '' });
      // setInputFields([
      //   { name: 'New', probability: null },
      //   { name: 'Lost', probability: null },
      //   { name: 'Won', probability: null },
      // ]);
      enqueueSnackbar(
        `Pipeline has been ${
          isDraweropen?.type === 'edit' ? 'Updated' : 'Created'
        } Successfully`,
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    } finally {
      // setLoading(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  // check box function

  const handleSelectDealsById = (checked: boolean, id: string): void => {
    if (checked) {
      setCheckedDeal([...checkedDeal, id]);
    } else {
      setCheckedDeal(checkedDeal?.filter((_id: any) => _id !== id));
    }
  };

  // console.log('checkedDeal', checkedDeal)

  const handleDelete = async () => {
    try {
      // setLoading(true);
      await deleteDealsPipeline({ ids: checkedDeal }).unwrap();
      // setSelectedPipelines([]);
      setCheckedDeal([]);
      setDeleteModalOpen(false);
      enqueueSnackbar('Deal Pipeline has been Deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    } catch (error) {
      enqueueSnackbar(`${error}`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    } finally {
      // setLoading(false);
    }
  };

  const getCheckbox = (event: any, value: any) => {
    setDisableButton(event?.target?.checked);
    setdefaultValue(value === 'default');
  };

  // const addField = () => {
  //   const newInputFields = [...inputFields];
  //   const indexToInsert = inputFields?.length - 2;
  //   newInputFields?.splice(indexToInsert, 0, { name: '', probability: null });
  //   setInputFields(newInputFields);
  // };

  // const deleteField = (index: any) => {
  //   const values = [...inputFields];
  //   values?.splice(index, 1);
  //   setInputFields(values);
  // };

  // const handleChangeInputStage = (index: any, event: any) => {
  //   const values: any = [...inputFields];
  //   values[index][event?.target?.name] = event?.target?.value;
  //   setInputFields(values);
  // };

  // const handleChangeInput = (index: any, event: any) => {
  //   const { name, value } = event.target;
  //   // Validate if value is a positive number
  //   const parsedValue = parseFloat(value);
  //   if (!isNaN(parsedValue) && parsedValue >= 0) {
  //     setInputFields((prevFields) => {
  //       const updatedFields: any = [...prevFields];
  //       updatedFields[index][name] = parsedValue;
  //       return updatedFields;
  //     });
  //   } else {
  //     // If value is not a positive number, set it to 0 or any other default value
  //     setInputFields((prevFields) => {
  //       const updatedFields: any = [...prevFields];
  //       updatedFields[index][name] = 0; // You can set it to any default value you prefer
  //       return updatedFields;
  //     });
  //   }
  // };

  // const togglePipeline = (pipeline: any) => {
  //   const index = selectedPipelines?.findIndex(
  //     (p: any) => p?._id === pipeline?._id,
  //   );
  //   if (index === -1) {
  //     setSelectedPipelines([...selectedPipelines, pipeline]);
  //   } else {
  //     const updatedPipelines = [...selectedPipelines];
  //     updatedPipelines?.splice(index, 1);
  //     setSelectedPipelines(updatedPipelines);
  //   }
  // };

  return {
    handleSelectDealsById,
    isDraweropen,
    setIsDraweropen,
    isEditMode,
    dealPipelinesData: data?.data,
    setIsEditMode,
    isDeleteModalOpen,
    setDeleteModalOpen,
    productSearch,
    setproductSearch,
    theme,
    anchorEl,
    open,
    handleClick,
    handleClose,
    handleCloseDrawer,
    // dealPipelines,
    // handleSubmit,
    onSubmit,
    handleCloseDeleteModal,
    handleDelete,
    getCheckbox,
    setDisableButton,
    isDisableButton,
    // addField,
    // deleteField,
    setAnchorEl,
    isdefaultValue,
    isLoading,
    // inputFields,
    // handleChangeInput,
    checkedDeal,
    setCheckedDeal,
    // selectedPipelines,
    // setSelectedPipelines,
    // togglePipeline,
    postDealLoading,
    // pipelineById,
    // handleChangeInputStage
    deleteDealLoading,
  };
};

export default useDealPipelines;
