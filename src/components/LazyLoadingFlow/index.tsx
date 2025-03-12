import ConditionalAlert from '@/components/Feedbacks/ConditionalAlert';
import { LazyLoadingFlowPropsI } from './LazyLoadingFlow.interface';
import LazyComponentLoaders from '../Loaders/LazyComponentLoaders';

const LazyLoadingFlow = (props: LazyLoadingFlowPropsI) => {
  const { name, isLoading, error } = props;

  if (isLoading) return <LazyComponentLoaders name={name} />;
  if (error)
    return <ConditionalAlert condition={!!error} message="Please try later" />;
};

export default LazyLoadingFlow;
