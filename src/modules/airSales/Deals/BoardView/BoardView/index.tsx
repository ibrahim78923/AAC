// import BoardCard from './BoardCard';
import DealCard from './BoardCard/DealCard';

// import { styles } from './BoardView.style';

const BoardView = ({
  // handleCheckedGrid,
  // checkedGridView,
  search,
  filterVal,
}: any) => {
  return (
    <DealCard
      // handleCheckedGrid={handleCheckedGrid}
      // checkedGridView={checkedGridView}
      search={search}
      filterVal={filterVal}
    />
  );
};

export default BoardView;
