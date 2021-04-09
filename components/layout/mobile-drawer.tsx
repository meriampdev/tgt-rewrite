import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../redux/rootReducer'
import { getProductCategories } from '../../redux/products/actions'
import { navPaths } from './navigation/constants'
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [open, setState] = React.useState(false);

  const dispatch = useDispatch()
  const categories = useSelector((state: ApplicationState) => state.products.categories)

  useEffect(() => {
    if(categories.length <= 0) {
      dispatch(getProductCategories())
    }
  }, [])

  const toggleDrawer = () => {
    setState(!open);
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        <ListItem>
          <Link href="/" style={{textDecoration: 'none'}}>
            <div className='cursor-pointer nav-item flex flex-row items-center text-sm gap-2 px-5 text-gray-900'>
              <span className="text-base">Home</span>
            </div>
          </Link>
        </ListItem>
        {categories.map((cat) => {
          if(!navPaths[cat.lookupValue]) return null
          return (
            <ListItem button key={navPaths[cat.lookupValue].path} className="hover:bg-green-300">
              <Link href={navPaths[cat.lookupValue].path} style={{textDecoration: 'none'}}>
                <div className='cursor-pointer nav-item flex flex-row items-center text-sm gap-2 px-5 text-gray-900'>
                  <span className="text-base">{navPaths[cat.lookupValue].text}</span>
                </div>
              </Link>
            </ListItem>
          )
        })}
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText>Meriam Pales</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        style={{color: "#FFF"}}
        aria-label="open drawer"
        onClick={toggleDrawer}
        edge="start"
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        {list()}
      </Drawer>
    </div>
  );
}
