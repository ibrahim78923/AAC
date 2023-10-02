import Card from './Card';
import Tabs from './Tabs';
import Menu from './Menu';
import Link from './Link';
import Lists from './List';
import Table from './Table';
import Alert from './Alert';
import Badge from './Badge';
import Paper from './Paper';
import Input from './Input';
import Radio from './Radio';
import Drawer from './Drawer';
import Dialog from './Dialog';
import Slider from './Slider';
import Button from './Button';
import Switch from './Switch';
import SvgIcon from './SvgIcon';
import Tooltip from './Tooltip';
import Popover from './Popover';
import Stepper from './Stepper';
import Skeleton from './Skeleton';
import Backdrop from './Backdrop';
import Progress from './Progress';
import Checkbox from './Checkbox';
import Accordion from './Accordion';
import Typography from './Typography';
import Pagination from './Pagination';
import Breadcrumbs from './Breadcrumbs';
import ButtonGroup from './ButtonGroup';
import CssBaseline from './CssBaseline';
import Autocomplete from './Autocomplete';
import ControlLabel from './ControlLabel';
import LoadingButton from './LoadingButton';

const ComponentsOverrides = (theme: any) => {
  return Object.assign(
    Tabs(theme),
    Card(theme),
    Menu(theme),
    Link(),
    Input(theme),
    Radio(theme),
    Badge(),
    Lists(theme),
    Table(theme),
    Paper(theme),
    Alert(theme),
    Switch(theme),
    Button(theme),
    Dialog(theme),
    Slider(theme),
    Drawer(theme),
    Stepper(theme),
    Tooltip(theme),
    Popover(theme),
    SvgIcon(),
    Checkbox(theme),
    Skeleton(theme),
    Backdrop(theme),
    Progress(theme),
    Accordion(theme),
    Typography(theme),
    Pagination(theme),
    ButtonGroup(theme),
    Breadcrumbs(theme),
    CssBaseline(),
    Autocomplete(theme),
    ControlLabel(theme),
    LoadingButton(),
  );
};

export default ComponentsOverrides;
