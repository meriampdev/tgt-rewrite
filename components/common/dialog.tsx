import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: "red",
    },
    content: {
      padding: 5
    }
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
children: React.ReactNode;
onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
const { children, classes, onClose, ...other } = props;
return (
  <MuiDialogTitle disableTypography className={classes.root} {...other}>
    <Typography variant="h6">{children}</Typography>
    {onClose ? (
      <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    ) : null}
  </MuiDialogTitle>
);
});


interface ActionProps extends ButtonProps {
  label: string
}
interface IProps extends DialogProps {
  onClose: () => void
  dialogActions?: ActionProps[]
  title?: string
  children: any
}
export default function ResponsiveDialog(props: IProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.open}
      onClose={props.onClose}
      scroll={props.scroll || "paper"}
      maxWidth={props.maxWidth || "lg"}
      className={props.className}
      fullWidth
    >
      <DialogTitle onClose={props.onClose}>{props.title}</DialogTitle>
      
      <DialogContent className="p-5">
        {props.children}
      </DialogContent>
      {
        props.dialogActions && 
        <DialogActions>
        {
          props.dialogActions.map((action: ActionProps, i) => {
            return (
              <Button autoFocus onClick={action.onClick} color={action.color}>
                {action.label}
              </Button>
            )
          })
        }
        </DialogActions>
      }
    </Dialog>
  );
}