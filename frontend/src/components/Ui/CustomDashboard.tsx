import React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { dashboardData } from '../../data/dashboardData'
import { Link } from '@mui/material'
import { NavLink } from 'react-router-dom'

const drawerWidth = 240

function CustomDashboard({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', position: 'sticky' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1281d5',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Toolbar />
        <Divider />
        <Toolbar />
        <Divider />

        <List sx={{ paddingBottom: '50px', paddingTop: '50px' }}>
          {dashboardData.map((text, i) => (
            <ListItem
              key={text.url}
              disablePadding
              sx={{ marginBottom: i < 3 ? '24px' : 0, color: '#fff' }}
            >
              <Link to={text.url} component={NavLink} underline='none'>
                <ListItemButton>
                  <ListItemIcon>{<text.icon />}</ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={text.label}
                    sx={{ fontFamily: 'initial !important' }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Toolbar />
        <Divider />
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
export default CustomDashboard
