import { AlertModalDeleteIcon } from '@/assets/icons';

const DELETE_STRING: string = 'delete';

export const checkModalTypeForImage = (type: string) =>
  type?.toLowerCase() === DELETE_STRING ? <AlertModalDeleteIcon /> : undefined;
