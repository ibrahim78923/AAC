import { ICONS, MODAL_TYPES } from './scheduleModals.data';

const useScheduleModals = ({ type }: { type: string }) => {
  const checkModelType = () => {
    const lowerCaseType = type.toLowerCase();

    switch (lowerCaseType) {
      case MODAL_TYPES.ASSIGN:
        return 'Assign';
      case MODAL_TYPES.EXPORT:
        return 'Export File';
      case MODAL_TYPES.RESCHEDULE:
        return 'Reschedule Call';
      case MODAL_TYPES.OUTCOME:
        return 'Outcome';
      default:
        return null;
    }
  };

  const checkModelTypeForImage = () => {
    const lowerCaseType = type.toLowerCase();
    return ICONS[lowerCaseType] || null;
  };

  return { checkModelType, checkModelTypeForImage };
};

export default useScheduleModals;
