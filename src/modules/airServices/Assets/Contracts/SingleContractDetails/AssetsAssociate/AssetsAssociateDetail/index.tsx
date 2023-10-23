import { Fragment, useState } from 'react';
import { AssetsAssociateTable } from './AssetsAssociateTable';
import { AssetsAssociateHeader } from './AssetsAssociateHeader';

export const AssetsAssociateDetail = () => {
  const [activeCheck, setActiveCheck] = useState<string[]>([]);
  return (
    <Fragment>
      <AssetsAssociateHeader activeCheck={activeCheck} />
      <br />
      <AssetsAssociateTable
        activeCheck={activeCheck}
        setActiveCheck={setActiveCheck}
      />
    </Fragment>
  );
};
