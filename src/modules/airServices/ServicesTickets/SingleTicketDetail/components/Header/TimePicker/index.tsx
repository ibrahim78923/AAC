import { inputStyle } from './TimePicker.style';
import useTimePickerState from './useTimePicker';

function TimePicker() {
  const { time, handleTimeChange } = useTimePickerState();
  return (
    <input
      type="text"
      value={time}
      onChange={handleTimeChange}
      placeholder="00:00"
      style={inputStyle}
    />
  );
}

export default TimePicker;
