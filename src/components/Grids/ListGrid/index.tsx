import { CustomGrid } from '../CustomGrid';

export const ListGrid = (props: any) => {
  const { list = [], spacing = 2, render, md = 6, lg = md } = props;
  return (
    <CustomGrid isContainer spacing={spacing}>
      {list?.map((singleItem: any) => (
        <CustomGrid xs={12} md={md} lg={lg} key={singleItem?._id}>
          {render(singleItem)}
        </CustomGrid>
      ))}
    </CustomGrid>
  );
};
