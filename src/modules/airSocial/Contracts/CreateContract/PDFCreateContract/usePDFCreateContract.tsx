import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSignatureComponent,
  addTextComponent,
} from '@/redux/slices/airSocial/contracts/pdf-contract/slice';
import { RootState } from '@/redux/store';

export default function usePDFCreateContract() {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.airSocialPdfContract.currentPage,
  );
  // Add Text
  const handleAddText = useCallback(() => {
    dispatch(addTextComponent());
  }, [dispatch]);

  // Add Signature
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddSignature = (signee: any) => {
    dispatch(
      addSignatureComponent({
        name: signee.name,
        email: signee.email,
        x: 100,
        y: 100,
        page: currentPage,
      }),
    );
  };

  return {
    handleAddText,

    anchorEl,
    open,
    handleClick,
    handleClose,
    handleAddSignature,
  };
}
