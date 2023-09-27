import SkeletonFormExample from '@/components/Skeletons/SkeletonForm/SkeletonForm.example';
import SkeletonTableExample from '@/components/Skeletons/SkeletonTable/SkeletonTable.example';
import HorizontalTabsExample from '@/components/Tabs/HorizontalTabs/HorizontalTabs.example';

export const TestComponentsNoumanPage = () => {
  return (
    <>
      <HorizontalTabsExample />
      <br />
      <SkeletonTableExample />
      <br />
      <SkeletonFormExample />
    </>
  );
};

export default TestComponentsNoumanPage;
