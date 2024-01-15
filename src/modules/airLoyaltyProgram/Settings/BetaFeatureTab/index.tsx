import TanstackTable from '@/components/Table/TanstackTable';
import { betaFeatureColumn, betaFeaturedata } from './BetaFeature.data';

export const BetaFeature = () => {
  return <TanstackTable data={betaFeaturedata} columns={betaFeatureColumn} />;
};
