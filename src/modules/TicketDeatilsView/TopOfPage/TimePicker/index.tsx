import { inputStyle } from './TimePicker.style';
import useTimePickerState from './UseTimePicker';

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
