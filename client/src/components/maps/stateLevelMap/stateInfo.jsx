import { Stack, Button, Divider, Typography, Box, Grid, Paper, TableCell, TableBody, Table, TableRow, TableHead, TableContainer } from '@mui/material';
import Statistic from './statistic';
import { useState } from 'react';
import { useEffect } from 'react';

export default function StateInfo(props) {
    const regularFetch = {info: props.data}

    const [range, setRange] = useState('foundPrimaryData');
    let dataTransfer

        if (props.type === 'regularFetch') {

        dataTransfer = regularFetch

        } else  {
            dataTransfer = props.data[range]
        }

    

    console.log(dataTransfer)
    


    const { name, abbreviation, capital, latitude, longitude} = dataTransfer.info.requestState;
    const { date, period, temperature, requestType } = dataTransfer.info;


    const apiInfo = {
        "Date": date,
        "Period": period,
        "Temperature": temperature,
        "Request Type": requestType,
      }
    
      const stateInfo = {
        "Name": name,
        "Abbreviation": abbreviation,
        "Capital": capital,
        "Latitude": latitude,
        "Longitude": longitude,
      }
    const { Temperature } = apiInfo;

    const keys = Object.keys(apiInfo);
    const values = Object.values(apiInfo);
    const datetime = new Date(values[0]).toLocaleDateString();

    return (
        <Box sx={{ justifyContent: "center", padding: '3%', minHeight: '50vh', backgroundColor: '#1a1a1a', borderColor: '#c6d300', borderRadius: 4, borderWidth: 3, borderStyle: 'solid', maxWidth: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <Stack direction="row" spacing={1}>
            <Button variant="contained" sx={{ backgroundColor: '#c6d300', color: '#1a1a1a', marginRight: 1 }} onClick={() => setRange('foundPrimaryData')}>Primary Date</Button>
            <Button variant="contained" sx={{ backgroundColor: '#c6d300', color: '#1a1a1a', marginLeft: 1 }} onClick={() => setRange('foundSecondaryData')}>Secondary Date</Button>
            </Stack>
            <Typography variant='h2' sx={{ color: '#c6d300', marginBottom: 1 }}>{stateInfo.Name}</Typography>
            <Divider sx={{ width: '100%', marginBottom: 2 }} />
            <Grid container spacing={2} sx={{ justifyContent: 'center', width: '100%' }}>
                <Grid item xs={12} sm={4}>
                    <Statistic temperature={Temperature} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography sx={{ color: '#c6d300', marginBottom: 1 }}>Name: {stateInfo.Name}</Typography>
                    <Typography sx={{ color: '#c6d300', marginBottom: 1 }}>Geolocation: {stateInfo.Latitude}, {stateInfo.Longitude}</Typography>
                    <Typography sx={{ color: '#c6d300', marginBottom: 2 }}>Date: {datetime}</Typography>
                </Grid>
                <Divider sx={{ width: '100%', marginBottom: 2 }} />
                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ backgroundColor: '#282828', borderRadius: 2, width: '100%' }}>
                        <Table sx={{ minWidth: '80%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ color: '#c6d300' }}>Property</TableCell>
                                    <TableCell align="right" style={{ color: '#c6d300' }}>Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {keys.map((key, index) => (
                                    <TableRow
                                        key={key}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" style={{ color: '#c6d300' }}>
                                            {key}
                                        </TableCell>
                                        <TableCell align="right" style={{ color: '#c6d300' }}>
                                            {values[index]}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    )
}
