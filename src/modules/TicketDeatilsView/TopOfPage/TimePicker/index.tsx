import { inputStyle } from './TimePicker.interface';
import useTimePickerState from './TimePicker.state';

function DetailTimePicker() {
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

export default DetailTimePicker;
