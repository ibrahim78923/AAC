import { MouseEvent, useState } from 'react';

export const useFolderMenu = (props: any) => {
  const { businessHourId } = props;
  const [actionPop, setActionPop] = useState<HTMLElement | null>(null);
  const handleActionClick = (event: MouseEvent<HTMLElement>) => {
    setActionPop(event?.currentTarget);
  };

  const handleActionClose = () => {
    setActionPop(null);
  };
  const openAction = Boolean(actionPop);
  return {
    handleActionClick,
    openAction,
    handleActionClose,
    actionPop,
    businessHourId,
  };
};
