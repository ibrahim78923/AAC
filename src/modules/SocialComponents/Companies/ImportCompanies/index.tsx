import React from 'react';

import CommonDrawer from '@/components/CommonDrawer';
import { enqueueSnackbar } from 'notistack';

import UploadFiles from './UploadFiles';
import ColumnFiles from './ColumnFiles';

import useToggle from '@/hooks/useToggle';

const ImportCompanies = ({ isImport, setIsImport }: any) => {
  const [isToggled, toggle] = useToggle();

  const handelSubmit = () => {
    if (!isToggled) {
      toggle(true);
    } else {
      setIsImport(false);
      enqueueSnackbar('File Import Successfully', {
        variant: 'success',
      });
    }
  };

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isImport}
        onClose={() => {
          setIsImport(false);
        }}
        title="Import Companies"
        okText={isToggled ? 'Import' : 'Next'}
        isOk={true}
        footer={true}
        submitHandler={handelSubmit}
      >
        {isToggled ? <ColumnFiles /> : <UploadFiles />}
      </CommonDrawer>
    </>
  );
};

export default ImportCompanies;
