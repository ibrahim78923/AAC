export const useChartEditor = (props: any) => {
  const { chartComponent, setFinalChartComponent, setFieldData, setModal } =
    props;

  const handleSave = () => {
    setFinalChartComponent(chartComponent);
    setFieldData(false);
    setModal({
      chart: false,
      interactiveFilter: false,
      text: false,
      table: false,
    });
  };

  return {
    handleSave,
  };
};
