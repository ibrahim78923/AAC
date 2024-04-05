import { useEffect, useState } from 'react';
import {
  useGetUserQuickLinksQuery,
  useUpdateSettingsQuickLinkMutation,
} from '@/services/superAdmin/settings/quick-links';
import { enqueueSnackbar } from 'notistack';
import useAuth from '@/hooks/useAuth';
import { EQuickLinksType, EQUICKLINKSROLES } from '@/constants';

const useLinkDropDown = () => {
  const user: any = useAuth();
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

  const payload: any = {
    type: EQuickLinksType?.PRODUCT,
    productId: user?.product?._id,
  };
  // Login as SUPER_ADMIN & ORG_ADMIN
  if (user?.product?.name === EQUICKLINKSROLES?.SUPER_ADMIN) {
    payload.type = EQuickLinksType?.SUPER_ADMIN;
  } else if (user?.product == null) {
    payload.type = EQuickLinksType?.ORG_ADMIN;
  }
  const { data, isLoading, isFetching } = useGetUserQuickLinksQuery(payload);
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
    const payload: any = {
      type: EQuickLinksType?.PRODUCT,
      productId: user?.product?._id,
      quickLinksIds: checkedItems,
    };
    // Login as SUPER_ADMIN & ORG_ADMIN
    if (user?.product?.name === EQUICKLINKSROLES?.SUPER_ADMIN) {
      payload.type = EQuickLinksType?.SUPER_ADMIN;
    } else if (user?.product == null) {
      payload.type = EQuickLinksType?.ORG_ADMIN;
    }

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
