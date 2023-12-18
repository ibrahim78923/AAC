import { useState } from 'react';

export const useRules = (props: any) => {
  const { setValue } = props;
  const [search, setSearch] = useState();
  return {
    search,
    setSearch,
    setValue,
  };
};
