import Settings from './Settings';

const AddAssets = ({
  handleCloseAddAssetsModal,
  isOpenAddAssets,
  theme,
}: any) => {
  return (
    <Settings
      closeAddAssets={handleCloseAddAssetsModal}
      isOpenAddAssets={isOpenAddAssets}
      theme={theme}
    />
  );
};
export default AddAssets;
