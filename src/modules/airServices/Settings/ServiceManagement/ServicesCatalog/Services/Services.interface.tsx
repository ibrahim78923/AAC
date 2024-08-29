import { PopoverVirtualElement } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface IServicesProps {
  methodAdd?: any;
  handleSubmit?: any;
  onSubmit?: (data?: any) => void;
  open?: boolean;
  handleClose?: (open?: boolean) => void;
  postServiceCatalogTriggerStatus?: any;
  setOpen?: (open: boolean) => void;
  methodChangeStatus?: any;
  openStatus?: boolean;
  setOpenStatus?:
    | ((open?: boolean) => void)
    | Dispatch<SetStateAction<boolean>>;
  patchServiceCatalogTriggerStatus?: any;
  id?: string | any;
  setSelectedCheckboxes?: (open?: any[]) => void;
  apiQueryCategroy?: any;
  openVisibilityE1?: boolean;
  handleCloseVisibility?: () => void;
  anchorEl?: PopoverVirtualElement | any;
  setAnchorEl?: ((anchorEl?: boolean) => void) | any;
  selectedCheckboxes?: any[];
  isDisabled?: boolean;
  handleClickVisibility?: any;
}
