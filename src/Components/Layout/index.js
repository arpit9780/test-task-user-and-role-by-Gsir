import React from 'react'
import Header from './Header'
import Footer from './Footer'
import SideBar from './SideBar'
import { Grid } from '@mui/material'
export const Layout = (props) => {
    return (
        <div>
            <Header />
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={3}>
                    <SideBar />
                </Grid>
                <Grid item xs={9}>
                    {props.children}
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}
