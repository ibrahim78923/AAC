import { ContainerGrid } from '../ContainerGrid';
import { CustomGrid } from '../CustomGrid';

export const ListGrid = (props: any) => {
  const {
    list = [],
    spacing = 2,
    render,
    sm = 12,
    md = 6,
    lg = md,
    xl = lg,
  } = props;

  return (
    <ContainerGrid spacing={spacing}>
      {list?.map((singleItem: any) => (
        <CustomGrid
          xs={12}
          sm={sm}
          md={md}
          xl={xl}
          lg={lg}
          key={singleItem?._id}
        >
          {render(singleItem)}
        </CustomGrid>
      ))}
    </ContainerGrid>
  );
};
