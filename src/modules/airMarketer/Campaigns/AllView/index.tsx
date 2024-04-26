import Table from './Table';
import useAllView from './useAllView';
import CloneModal from './CloneModal';

const AllView = () => {
  const { isAllViewActionsModal, setIsAllViewActionsModal } = useAllView();
  return (
    <>
      <Table />
      {isAllViewActionsModal?.isClone && (
        <CloneModal
          isAllViewActionsModal={isAllViewActionsModal?.isClone}
          setIsAllViewActionsModal={setIsAllViewActionsModal}
        />
      )}
    </>
  );
};
export default AllView;
