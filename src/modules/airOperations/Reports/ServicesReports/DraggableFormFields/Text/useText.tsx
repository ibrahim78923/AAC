export const useText = (props: any) => {
  const { alignItem } = props;
  let paddingTop = '0px';
  let paddingBottom = '0px';

  if (alignItem === 'middle') {
    paddingTop = '50%';
    paddingBottom = '50%';
  } else if (alignItem === 'bottom') {
    paddingTop = '100%';
    paddingBottom = '0px';
  }
  return {
    paddingTop,
    paddingBottom,
  };
};
