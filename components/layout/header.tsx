import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    textTransform: 'capitalize',
    fontFamily: "'Montserrat', 'Open Sans', sans-serif",
    fontWeight: 'bold'
  },
}));
export default function Header() {
  const classes = useStyles();

  return (
    <header>
      <div className="hidden md:flex flex-row justify-between bg-lime-600 text-white items-center text-xs px-5">
        <div><span className="font-bold">Seller Center | Sell on The Green Table</span></div>
        <div className="flex flex-row gap-2 justify-end">
          <Button
            className={classes.button}
            size="small"
            startIcon={<NotificationsNoneIcon />}
          >
            Notification
          </Button>
          <Button
            className={classes.button}
            size="small"
            startIcon={<HelpOutlineIcon />}
          >
            Help
          </Button>
        </div>
      </div>
    </header>
  )
}