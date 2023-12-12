import { Grid } from '@mui/material';
import Table from './Table';
import useAllView from './useAllView';
import CloneModal from './CloneModal';

const AllView = () => {
  const { isAllViewActionsModal, setIsAllViewActionsModal } = useAllView();
  return (
    <Grid>
      <Table />
      {isAllViewActionsModal?.isClone && (
        <CloneModal
          isAllViewActionsModal={isAllViewActionsModal?.isClone}
          setIsAllViewActionsModal={setIsAllViewActionsModal}
        />
      )}
    </Grid>
  );
};
export default AllView;
