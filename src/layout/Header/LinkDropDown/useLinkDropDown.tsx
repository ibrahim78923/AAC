import { useEffect, useState } from 'react';
import {
  useGetUserQuickLinksQuery,
  useUpdateSettingsQuickLinkMutation,
  useGetQuickLinksQuery,
} from '@/services/superAdmin/settings/quick-links';
import { enqueueSnackbar } from 'notistack';
import useAuth from '@/hooks/useAuth';
import { EQuickLinksType, QUICKLINKSROLES } from '@/constants';
import { useRouter } from 'next/router';

const useLinkDropDown = () => {
  const user: any = useAuth();
  const router = useRouter();
  const pathName = router?.pathname;
  const userType = pathName.split('/')[1];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [checkedItems, setCheckedItems] = useState<any[]>([]);
  const [toggleView, setToggleView] = useState(false);
  const [activeLinkNumer, setActiveLinkNumer] = useState(0);

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

  // Get Active QuickLinks List
  const {
    data: dataActiveQuickLinks,
    isLoading: loadingAcitiveQuickLinks,
    isFetching: fetchingAcitiveQuickLinks,
  } = useGetQuickLinksQuery({});
  const activeQuickLinksData = dataActiveQuickLinks?.data?.quicklinks?.filter(
    (item: any) => item.isActive,
  );
  const activeQuickLInkNumber = activeQuickLinksData?.length;

  // Get Checked QuickLinks
  const payload: any = {
    type: EQuickLinksType?.PRODUCT,
    productId: user?.product?._id,
  };
  // Login as SUPER_ADMIN & ORG_ADMIN
  if (userType === QUICKLINKSROLES?.SUPER_ADMIN) {
    payload.type = EQuickLinksType?.SUPER_ADMIN;
    payload.productId = undefined;
  } else if (userType === QUICKLINKSROLES?.ORG_ADMIN) {
    payload.type = EQuickLinksType?.ORG_ADMIN;
    payload.productId = undefined;
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
    // Logedin as SUPER_ADMIN & ORG_ADMIN
    if (userType === QUICKLINKSROLES?.SUPER_ADMIN) {
      payload.type = EQuickLinksType?.SUPER_ADMIN;
      payload.productId = undefined;
    } else if (userType === QUICKLINKSROLES?.ORG_ADMIN) {
      payload.type = EQuickLinksType?.ORG_ADMIN;
      payload.productId = undefined;
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

    activeQuickLinksData,
    loadingAcitiveQuickLinks,
    fetchingAcitiveQuickLinks,
    activeQuickLInkNumber,
    userQuickLinks,
    isLoading,
    isFetching,
    quickLinksIds,
    checkedItems,
    handleCheckboxChange,
    handleSubmitSaveQuickLinks,
    loadingSaveQuickLinks,
    setActiveLinkNumer,
    activeLinkNumer,
  };
};

export default useLinkDropDown;
