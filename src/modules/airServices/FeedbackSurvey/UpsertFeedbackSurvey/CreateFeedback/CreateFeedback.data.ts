export const sectionDropdownOptions = ({
  cloneSection,
  removeSection,
  mergeSection,
  index,
}: any) => [
  {
    id: 1,
    title: 'Clone Section',
    handleClick: (setClose: any) => {
      setClose();
      cloneSection(index);
    },
  },
  {
    id: 2,
    title: 'Delete Section',
    handleClick: (setClose: any) => {
      setClose();
      removeSection(index);
    },
  },
  {
    id: 3,
    title: 'Merge with above',
    handleClick: (setClose: any) => {
      setClose();
      mergeSection(index);
    },
  },
];
