import React, { useEffect } from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../redux/rootReducer'
import { getProductCategories } from '../../redux/products/actions'
import MiniCart from '../cart/mini-cart'

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function TemporaryDrawer() {
  const [open, setState] = React.useState(false);
  const cart = useSelector((state: ApplicationState) => state.cart.data)

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

  return (
    <div>
      <IconButton aria-label="cart" color="inherit" onClick={toggleDrawer}>
        <StyledBadge badgeContent={cart.length} color="secondary">
          <ShoppingCartOutlinedIcon fontSize="large" />
        </StyledBadge>
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <MiniCart toggle={toggleDrawer} />
      </Drawer>
    </div>
  );
}
