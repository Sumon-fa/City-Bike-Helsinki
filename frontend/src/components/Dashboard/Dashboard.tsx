import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'

import { Grid, Paper, Typography } from '@mui/material'
import { styled } from '@mui/system'
import CustomDashboard from '../Ui/CustomDashboard'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#0069ac',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

function Dashboard() {
  return (
    <CustomDashboard>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <Typography>Total Journey</Typography>
            <Toolbar />
            <Divider />
            <Typography>5000</Typography>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>Total Station</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Top 5 Return Station </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Top 5 Departure Station</Item>
        </Grid>
      </Grid>
    </CustomDashboard>
  )
}
export default Dashboard