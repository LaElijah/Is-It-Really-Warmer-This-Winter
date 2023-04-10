import { useState, useEffect } from 'react';
import { Divider, Typography, Box, Grid, Stack, Button } from '@mui/material';
import Statistic from './statistic';

export default function stateInfo(props) {

    const temperature = 9





    return (

        <Box sx= {{ padding: '3%', border: 'black', minHeight: '80vh', backgroundColor: 'lightgrey'}}>
        
            <Typography>State Info Menu</Typography>
            <Divider />
            <Grid container spacing={2}>
                <Grid item xs sm={4}>
                    <Statistic temperature={temperature} /> {/* KEEP THIS */}
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item sm={7}>
                    <Typography> State Info</Typography> {/* TODO: State Identifying Info */}
                </Grid>
                <Divider />
                <Grid item sm={12}>
                    <Statistic temperature={temperature} /> {/* TODO: Raw Stats scrollable */}
                    </Grid>
                <Divider />
                <Grid item sm={12}>
                    <Typography>h</Typography>{/* TODO: General Trend Summary */}
                    </Grid>


            </Grid>


           
            
        
        </Box>
    )
}