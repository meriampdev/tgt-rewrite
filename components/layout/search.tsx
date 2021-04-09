import { useState, useEffect } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Divider from '@material-ui/core/Divider';
import { signIn, signOut, getSession } from 'next-auth/client'
import SearchBar from './searchBar'
import Cart from './cart'
import MobileDrawer from './mobile-drawer'

const useStyles = makeStyles((theme) => ({
  divider: {
    height: 28,
    margin: 4,
    backgroundColor: '#FFF'
  },
}));
export default function Search(props) {
  const classes = useStyles();
  const [ session, setSession ] = useState(null)

  useEffect(() => {
    (async () => {
      const userSession = await getSession()
      if(userSession) {
        setSession(userSession.user)
      }
    })()
  }, [])

  console.log('session', session)
  return (
    <div className="app-search p-3">
      <div className='cursor-pointer brand'>
        <Link href='/'>
          <img className="h-full" src="/images/tgt-box-logo.png" alt="" />
        </Link>
      </div>
      <div className='cursor-pointer brand-logo'>
        <MobileDrawer />
        {/* <Link href='/'>
          <img className="h-full" src="/images/favicon.ico" alt="" />
        </Link> */}
      </div>
      <div className="search-bar">
        <SearchBar />
        <div className="user flex items-center justify-end text-white">
          {
            session ? 
            <Button
              id="user-account"
              color="inherit"
              size="small"
              endIcon={<KeyboardArrowDownIcon />}
            >
              {`${session?.name}`}
            </Button>
            :
            <Button
              id="user-account"
              color="inherit"
              size="small"
              onClick={() => signIn()}
            >
              Sign In
            </Button>
          }
          <Divider className={classes.divider} orientation="vertical" />
          <Cart />
        </div>
      </div>
    </div>
  )
}