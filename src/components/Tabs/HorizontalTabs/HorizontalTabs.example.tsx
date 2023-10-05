import HorizontalTabs from '.';

const TEST_COMPONENT_TABS = ['Overview', 'Associations'];

export const HorizontalTabsExample = () => {
  return (
    <>
      <>Horizontal Tabs</>
      <HorizontalTabs tabsDataArray={TEST_COMPONENT_TABS} />;
    </>
  );
};

export default HorizontalTabsExample;
