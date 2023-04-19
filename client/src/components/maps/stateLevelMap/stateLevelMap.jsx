import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import * as d3 from 'd3';
import { Typography, Stack, Button, Box, Grid, Tooltip, CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import StateInfo from './stateInfo.jsx';

// Future Updates
// 1. Chnage date picker to datetime picker
// 2. Add more accesible buttons for smaller states/regions
// 3. Add a legend for the colors
// 4. Refractor code
// 5. add a bug submit form









export default function StateLevelMap() {

  const [state, setState] = useState();
  const [type , setType] = useState('regularFetch');
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [selected, setSelected] = useState();
  const [mapData, setMapData] = useState({});
  const [pastDate, setPastDate] = useState(dayjs('2022-04-17'));
  const [primaryDate, setPrimaryDate] = useState(dayjs('2022-04-17'));
  const [secondaryDate, setSecondaryDate] = useState(dayjs('2021-04-17'));
  const [menu , setMenu] = useState();

  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

  async function fetchData() {
    const response = await fetch('/weather');
    const data = await response.json();
    return data
  }

  async function fetchPastData(date) {
    const url = `/weather/` + date
    const response = await fetch(url);
    const data = await response.json();
    return data
  }

  async function currentInfo() {
    setIsLoading(true);
    const data = await fetchData();
    setInfo(data);
  }

  async function fetchComparisonData(primaryDate, secondaryDate) {
    const url = `/weather/compare/${primaryDate}/${secondaryDate}`;
    const response = await fetch(url);
    const data = await response.json();
    return data
  }


  async function compareInfo() { // not working



    const data = await fetchComparisonData(primaryDate, secondaryDate);

    const primaryWeather = data.results.primaryWeather

    for (let i = 0; i < data.length; i++) {
      primaryWeather[i].info.temperature = primaryWeather[i].info.temperature - secondaryWeather.results[i].info.temperature;

    }
    let info = { results: [],
    type: data.type,}
    info.results = primaryWeather
      let menu = { results: {primaryWeather: data.results.primaryWeather, secondaryWeather: data.results.secondaryWeather, type: data.type,}

      }
    setInfo(info);
    setMenu(menu);






  }

  async function pastInfo() {
    setIsLoading(true);

    const currentDate = dayjs(pastDate); // Get the current date as a Day.js object
    const formattedDate = currentDate.format('YYYY-MM-DD'); // Format the date as 'YYYY-MM-DD' string



    const pastData = await fetchPastData(formattedDate);
    setInfo(pastData);
  }



  function updateMap() {


    if (info.results) {

      const temperatures = info.results.map(d => d.info.temperature);
      const minTemperature = Math.min(...temperatures);
      const maxTemperature = Math.max(...temperatures);

      const colorScale = d3
        .scaleSequential()
        .interpolator(d3.interpolateRdYlBu)
        .domain([maxTemperature, minTemperature]);

      const mapData = info.results.reduce((acc, d) => {
        acc[d.info.requestState.name] = colorScale(d.info.temperature);
        return acc;
      }, {});
      setMapData(mapData);
      setIsLoading(false);
    }
  }


  useEffect(() => {
    console.log('initial render')
    currentInfo();
  }, [])

  useEffect(() => {
    updateMap()
  }, [info])





  function mapSelectionHandler() {

    if (info.type == 'regularFetch') {
      const arr = info.results;
      setType('regularFetch')
      arr.find((d) => d.info.requestState.name === selected && setState(d.info))
    


    } else if (info.type === 'compare') {
      console.log("menu", menu)
      const primaryData = menu.results.primaryWeather;
      const secondaryData = menu.results.secondaryWeather;

      const foundPrimaryData = primaryData.find((d) => d.info.requestState.name === selected)
      const foundSecondaryData = secondaryData.find((d) => d.info.requestState.name === selected)

 
      const foundCompareData = {...foundPrimaryData}
      const foundCompareDataInfo = {...foundPrimaryData.info}
      const temperatureDifference =  foundPrimaryData.info.temperature - foundSecondaryData.info.temperature
      foundCompareDataInfo.temperature = temperatureDifference.toFixed(1)
      foundCompareDataInfo.period = `N/A`
      foundCompareDataInfo.date = `${secondaryDate} - ${primaryDate}`
      foundCompareData.info = foundCompareDataInfo
      
      
      const foundState = {foundPrimaryData, foundSecondaryData, foundCompareData}
      setType('compare')
      setState(foundState)

    } 

  }

  useEffect(() => {
    mapSelectionHandler()
  }, [selected])

  return (

    <Box>

      {/*Title and intro */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 2, backgroundColor: '#0a0a0a' }}>
        <Typography variant="h2" sx={{ marginBottom: 1, fontFamily: 'monospace', color: '#c6d300' }}>U.S. State Temperature Map</Typography>
        <Typography variant="h6" sx={{ marginBottom: 1, fontFamily: 'monospace', color: '#ffffff' }}>Discover the temperature patterns across the United States</Typography>
        <Typography variant="body1" sx={{ maxWidth: '80%', marginBottom: 2, fontFamily: 'monospace', color: '#cccccc' }}>This map shows the temperature of each state in the United States. The colors represent the temperature of each state. The darker the color, the colder the temperature. The lighter the color, the warmer the temperature. The temperature is measured in degrees Fahrenheit.</Typography>
      </Box>

      {/*Main Elements */}
      <Stack direction="column" alignItems="center" spacing={2}>

        {/*Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 2, backgroundColor: '#c6d300', borderRadius: 4 }}>

          {/* TODO: Stack row so that it is on the left side of the map and the buttons are on the right side of the map
TODO: add a legend that shows the temperature range and the colors that correspond to temperature range*/}

          <Box>
            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>


              <Grid item>

                <Button variant="contained" onClick={currentInfo}>
                  Current
                </Button>

              </Grid>


              <Grid item>
                <Stack direction="column" spacing={2}>

                <Button variant="contained" onClick={compareInfo}>
                  Compare
                </Button>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack direction="column" spacing={2}>
                    <DatePicker
                      label="Controlled picker"
                      value={primaryDate}
                      onChange={(newValue) => setPrimaryDate(newValue)}

                    />

                    <DatePicker
                      label="Controlled picker"
                      value={secondaryDate}
                      onChange={(newValue) => setSecondaryDate(newValue)}

                    />
                  </Stack>
                  </LocalizationProvider>
                  </Stack>

              </Grid>


              <Grid item>
                <Stack direction="column" spacing={2}>


                  <Button variant="contained" onClick={pastInfo}>
                    Past
                  </Button>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Controlled picker"
                      value={pastDate}
                      onChange={(newValue) => setPastDate(newValue)}

                    />
                  </LocalizationProvider>


                </Stack>
              </Grid>


            </Grid>
          </Box>






        </Box>


        <Box>
          <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>


            {/* Map Element */}
            <Grid item xs={12} lg={8}>


              <Box sx={{ position: 'relative', width: 'min(90vw, 90vh)', display: 'flex', alignItems: 'center', margin: '0 auto' }}>
                <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
                  <Box sx={{ backgroundColor: 'darkgrey', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderColor: '#c6d300', borderRadius: 4, borderWidth: 3, borderStyle: 'solid' }}>


                    {isLoading ? (
                      <Box
                        sx={{
                          position: 'absolute',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          borderRadius: 3,
                          backgroundColor: 'rgba(50, 50, 50, 0.7)',
                          zIndex: 1,
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    ) : null}

                    <Box
                      sx={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                      }}
                    >

                      <ComposableMap projection="geoAlbersUsa">
                        <Geographies geography={geoUrl}>
                          {({ geographies }) =>
                            geographies.map((geo) => (
                              <Tooltip title={geo.properties.name} key={geo.rsmKey}>
                                <Geography
                                  key={geo.rsmKey}
                                  geography={geo}
                                  fill={mapData[geo.properties.name] || '#EEE'}
                                  stroke="#000000"
                                  strokeWidth={0.8}
                                  onClick={() => {
                                    console.log("Clicked: ", geo.properties.name);
                                    setSelected(geo.properties.name);

                                  }}
                                  style={{
                                    default: {
                                      outline: "none"
                                    },
                                    hover: {
                                      outline: "none"
                                    },
                                    pressed: {
                                      outline: "none"
                                    }
                                  }}
                                />
                              </Tooltip>
                            ))
                          }
                        </Geographies>
                      </ComposableMap>

                    </Box>


                  </Box>
                </div>
              </Box>

            </Grid>


            {/* State Info Element */}
            <Grid item xs={12} lg={4}>

              <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
                { (state) && <StateInfo data={state} type={type} /> }
              </Box>

            </Grid>


          </Grid>
        </Box>


      </Stack>

    </Box>

  );
}

// This is the box i want to center  <Box sx={{ maxWidth: '80vw', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 2, backgroundColor: '#c6d300', borderRadius: 4 }}>
