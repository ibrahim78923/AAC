// import CommonDrawer from '@/components/CommonDrawer';
// import UploadFiles from './UploadFiles';
// import ColumnFiles from './ColumnFiles';
// import { FormProvider } from '@/components/ReactHookForm';
import useImportCompanies from './useImportCompanies';
import { Import } from '@/components/Import';
import { CRM_COLUMNS } from './importCompanies.data';
import { OBJECT_URL_IMPORT } from '@/constants/strings';

const ImportCompanies = ({ isDrawerOpen, setIsDrawerOpen }: any) => {
  const {
    // isToggled,
    // methods,
    // handleSubmit,
    // onSubmit,
    setDrawerDefaultState,
    importFileStatus,
    submitImport,
  } = useImportCompanies(setIsDrawerOpen);

  return (
    <>
      <Import
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        setDrawerDefaultState={setDrawerDefaultState}
        title="Import Companies"
        crmColumnsOptions={CRM_COLUMNS}
        objectUrl={OBJECT_URL_IMPORT?.USERS_ATTACHMENT}
        submitImport={(apiData: any) => submitImport?.(apiData)}
        importFileStatus={importFileStatus}
      />
      {/* <CommonDrawer
        isDrawerOpen={isImport}
        onClose={() => {
          setIsImport({ ...isImport, importDrawer: false });
        }}
        title="Import Companies"
        okText={isToggled ? 'Import' : 'Next'}
        isOk={true}
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
        >
        {isToggled ?
          <ColumnFiles />
          :
          <FormProvider methods={methods}>
            <UploadFiles />
          </FormProvider>
        }
      </CommonDrawer> */}
    </>
  );
};

export default ImportCompanies;
