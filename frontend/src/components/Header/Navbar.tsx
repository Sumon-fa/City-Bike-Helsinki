import React, { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom'

import {
  AppBar,
  Link,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { Menu } from '@mui/icons-material'
import { navData } from '../../data/navData'

import theme from '../Ui/theme'
import { MyStyledIconButton } from './navStyle'

const Navbar = () => {
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

  const [openDrawer, setOpenDrawer] = useState(false)
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const tabs = (
    <Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          marginLeft: 'auto',
        }}
        indicatorColor='secondary'
      >
        {navData.length > 0 &&
          navData.map(
            (
              nav: {
                url: string
                label: string
              },
              i: number
            ) => (
              <Tab
                sx={{
                  fontFamily: 'Raleway ',
                  textTransform: 'none',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                }}
                key={i}
                to={nav.url}
                label={nav.label}
                value={i}
                component={NavLink}
              />
            )
          )}
      </Tabs>
    </Fragment>
  )
  const drawer = (
    <Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        sx={{
          '& .MuiDrawer-paper': { backgroundColor: '#0069ac', width: '60%' },
        }}
      >
        <List>
          {navData.map(
            (
              nav: {
                url: string
                label: string
              },
              i: number
            ) => (
              <Link key={i} to={nav.url} component={NavLink} underline='none'>
                <ListItem
                  sx={{
                    borderBottom: '1px solid rgb(190 179 179 / 12%)',
                    textAlign: 'center',
                  }}
                  onClick={() => setOpenDrawer(false)}
                >
                  <ListItemText disableTypography>{nav.label}</ListItemText>
                </ListItem>
              </Link>
            )
          )}
        </List>
      </SwipeableDrawer>
      <MyStyledIconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <Menu sx={{ height: '40px', width: '40px' }} color='primary' />
      </MyStyledIconButton>
    </Fragment>
  )
  return (
    <AppBar position='sticky' color='secondary' sx={{ boxShadow: 'none' }}>
      <Toolbar>
        <Typography
          variant='h4'
          color='primary'
          sx={{
            fontSize: '2.5rem',
            marginLeft: '110px',
            fontWeight: 'lighter',
            fontFamily: 'Quicksand',
            [theme.breakpoints.down('sm')]: {
              fontSize: '1.5rem',
              marginLeft: '50px',
            },
          }}
        >
          City Bike
        </Typography>
        {matches ? drawer : tabs}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
