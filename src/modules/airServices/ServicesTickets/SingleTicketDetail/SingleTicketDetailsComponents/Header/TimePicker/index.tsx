import { styles } from './TimePicker.style';
import useTimePicker from './useTimePicker';

function TimePicker() {
  const { time, handleTimeChange } = useTimePicker();
  return (
    <input
      type="text"
      value={time}
      onChange={handleTimeChange}
      placeholder="00:00"
      style={styles}
    />
  );
}

export default TimePicker;
