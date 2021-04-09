import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Navigation from './navigation'


export default function CustomizedInputBase() {
  const classes = useStyles();
  const router = useRouter()
  const [ search, setSearch ] = useState('')

  const onChange = (e: any) => {
    let value = e.target.value 
    setSearch(value)
  }

  const onKeyPress = (e: any) => {
    if(e.key === 'Enter') {
      router.push(`/shop?search=${search}`)
    }
  }

  return (
    <div className="flex flex-col">
      <Paper elevation={0} className={classes.root}>
        {/* <IconButton className={classes.iconButton} aria-label="menu">
          <img className={classes.brand} src="/images/favicon.ico" alt="" />
        </IconButton> */}
        <InputBase
          fullWidth={true}
          className={classes.input}
          placeholder="Search Products"
          inputProps={{ 'aria-label': 'search products' }}
          value={search}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton type="button" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Navigation />
    </div>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    padding: 5,
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: '#16A34A'
  },
  iconButton: {
    padding: 5,
    color: '#16A34A'
  },
  brand: {
    height: 30
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));