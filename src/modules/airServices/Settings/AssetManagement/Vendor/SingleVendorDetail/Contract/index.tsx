import { data, columns } from './Contract.data';
import TanstackTable from '@/components/Table/TanstackTable';

export const Contract = () => {
  return <TanstackTable data={data} columns={columns()} isPagination />;
};

export default Contract;
