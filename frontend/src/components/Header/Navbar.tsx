import React, { Fragment, useState } from 'react'
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
import theme from '../Ui/theme'
import { navData } from '../../data/navData'
import { MyStyledIconButton } from './navStyle'

const Navbar = () => {
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const [openDrawer, setOpenDrawer] = useState(false)

  const tabs = (
    <Fragment>
      <Tabs
        sx={{
          marginLeft: 'auto',
        }}
        indicatorColor='secondary'
      >
        {navData.map(
          (
            nav: {
              id: string
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
              href={nav.id}
              label={nav.label}
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
          '& .MuiDrawer-paper': { backgroundColor: '#0069ac', width: '30%' },
        }}
      >
        <List>
          {navData.map(
            (
              nav: {
                id: string
                label: string
              },
              i: number
            ) => (
              <Link key={i} href={nav.id} underline='none'>
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
      <MyStyledIconButton>
        <Menu
          sx={{ height: '40px', width: '40px' }}
          color='primary'
          onClick={() => setOpenDrawer(!openDrawer)}
        />
      </MyStyledIconButton>
    </Fragment>
  )
  return (
    <AppBar position='fixed' color='secondary'>
      <Toolbar>
        <Typography
          variant='h4'
          color='primary'
          sx={{
            fontSize: '2.5rem',
            marginLeft: '110px',
            fontWeight: 'lighter',
            fontFamily: 'Quicksand',
            [theme.breakpoints.down('md')]: {
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
