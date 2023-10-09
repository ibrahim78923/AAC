import DeleteIcon from '@/assets/icons/shared/AlertModels/delete-icon';
import InfoIcon from '@/assets/icons/shared/AlertModels/info-icon';
import WarnIcon from '@/assets/icons/shared/AlertModels/warn-icon';

const deleteString: string = 'delete';
const infoString: string = 'info';
const successString: string = 'success';
const warnString: string = 'warn';

export const checkModelType = (type: string) =>
  type.toLowerCase() === deleteString
    ? deleteString
    : type.toLowerCase() === infoString
    ? 'Informatation'
    : type.toLowerCase() === successString
    ? 'Success'
    : type.toLowerCase() === warnString
    ? 'Warning'
    : null;

export const checkModelTypeForImage = (type: string) =>
  type.toLowerCase() === deleteString ? (
    <DeleteIcon />
  ) : type.toLowerCase() === infoString ? (
    <InfoIcon />
  ) : type.toLowerCase() === successString ? (
    'Success'
  ) : type.toLowerCase() === warnString ? (
    <WarnIcon />
  ) : null;

export const checkModelTypeMessage = (type: string) => {
  return type.toLowerCase() === deleteString
    ? 'Are you sure you want to delete this item ?'
    : type.toLowerCase() === infoString
    ? 'Information'
    : type.toLowerCase() === successString
    ? 'Success'
    : type.toLowerCase() === warnString
    ? 'Are you sure you want to revert all changes?'
    : '';
};
