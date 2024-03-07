import TanstackTable from '@/components/Table/TanstackTable';
import { assetsAssociateTableColumns } from './AssetsAssociateDetail.data';

export const AssetsAssociateDetail = (props: any) => {
  const {
    isLoading,
    isFetching,
    isError,
    isSuccess,
    assetsAssociateTableData,
  } = props;
  return (
    <>
      <br />
      <TanstackTable
        data={assetsAssociateTableData}
        columns={assetsAssociateTableColumns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
      />
    </>
  );
};
