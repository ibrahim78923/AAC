import { useEffect, useState } from 'react';
import {
  useGetUserQuickLinksQuery,
  useUpdateSettingsQuickLinkMutation,
} from '@/services/superAdmin/settings/quick-links';
import { enqueueSnackbar } from 'notistack';
// import useAuth from '@/hooks/useAuth';

const useLinkDropDown = () => {
  // const user = useAuth();
  // console.log('user::: ', user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [checkedItems, setCheckedItems] = useState<any[]>([]);
  const [toggleView, setToggleView] = useState(false);

  // Popup show/hide
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setToggleView(false);
  };

  // QuickLinks & EditLinks View Toggle
  const handleToggleView = () => {
    setToggleView(!toggleView);
  };

  const { data, isLoading, isFetching } = useGetUserQuickLinksQuery({
    type: 'SUPER_ADMIN',
  });
  const userQuickLinks = data?.data?.quickLinks || [];
  const quickLinksIds = data?.data?.quickLinksIds || [];

  useEffect(() => {
    setCheckedItems(quickLinksIds);
  }, [data?.data]);

  const handleCheckboxChange = (val: string) => {
    if (checkedItems?.includes(val)) {
      setCheckedItems(checkedItems?.filter((Id) => Id !== val));
    } else {
      setCheckedItems([...checkedItems, val]);
    }
  };

  const [saveQuickLinks, { isLoading: loadingSaveQuickLinks }] =
    useUpdateSettingsQuickLinkMutation();
  const handleSubmitSaveQuickLinks = async () => {
    const payload = {
      type: 'SUPER_ADMIN',
      quickLinksIds: checkedItems,
    };
    try {
      await saveQuickLinks({ body: payload })?.unwrap();
      handleClose();
      enqueueSnackbar('Quick links saved successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  return {
    anchorEl,
    open,
    handleClick,
    handleClose,
    toggleView,
    handleToggleView,
    userQuickLinks,
    isLoading,
    isFetching,
    quickLinksIds,
    checkedItems,
    handleCheckboxChange,
    handleSubmitSaveQuickLinks,
    loadingSaveQuickLinks,
  };
};

export default useLinkDropDown;
