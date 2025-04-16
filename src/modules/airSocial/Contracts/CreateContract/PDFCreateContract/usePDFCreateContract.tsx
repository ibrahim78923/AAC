import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addTextComponent,
  addSignatureComponent,
} from '@/redux/slices/airSocial/contracts/pdf-contract/slice';
// import { RootState } from '@/redux/store';

export default function usePDFCreateContract() {
  const dispatch = useDispatch();
  // const currentPage = useSelector(
  //   (state: RootState) => state.airSocialPdfContract.currentPage,
  // );

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

  const handleAddSignature = useCallback(
    (signee: any) => {
      dispatch(
        addSignatureComponent({
          signee: signee,
        }),
      );
      handleClose();
    },
    [dispatch],
  );

  return {
    handleAddText,

    anchorEl,
    open,
    handleClick,
    handleClose,
    handleAddSignature,
  };
}
