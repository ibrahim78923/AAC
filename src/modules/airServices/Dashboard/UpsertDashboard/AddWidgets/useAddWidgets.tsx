import { DropResult } from 'react-beautiful-dnd';
import { CheckboxOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const useAddWidgets = (props: any) => {
  const { dashboardWidgetsWatch, reportsWatch, setValue } = props;
  const alignArrays = (firstArray: CheckboxOptionsI[], secondArray: any[]) => {
    const dragAndDropAlignment = secondArray?.reduce((acc: any, item: any) => {
      if (firstArray?.includes(item?.value)) {
        acc?.push(item?.value);
      }
      return acc;
    }, []);
    return dragAndDropAlignment;
  };

  const reorder = (list: any, startIndex: number, endIndex: number): any => {
    const result = Array?.from(list);
    const [removed] = result?.splice(startIndex, 1);
    result?.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    const newItems = reorder(
      dashboardWidgetsWatch,
      source?.index,
      destination?.index,
    );
    const dragAndDropAlignment = alignArrays(reportsWatch, newItems);
    setValue('reports', dragAndDropAlignment);
    setValue('dashboardWidgets', newItems);
  };

  return {
    onDragEnd,
  };
};
