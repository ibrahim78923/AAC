import { AssociatesLists } from './AssociatesLists';

export const AssociateAssets = (props: any) => {
  const { setTotalAssets } = props;

  return (
    <>
      <AssociatesLists setTotalAssets={setTotalAssets} />
    </>
  );
};
