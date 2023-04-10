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













export default function StateLevelMap() {
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [mapData, setMapData] = useState({});
  const [value, setValue] = useState(dayjs('2022-04-17'));

  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

  async function fetchData() {
    const response = await fetch('/weather');
    const data = await response.json();
    return data
  }

  async function fetchPastData(date) {
    console.log('fetch')
    console.log(date)
    const url = `/weather/` + date
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    return data
  }

  async function currentInfo() {
    setIsLoading(true);
    const data = await fetchData();
    setInfo(data);
  }



  async function compareInfo(date = '2022-04-05') { // not working
    console.log(`arr`);
    const currentData = await fetchData();
    const pastData = await fetchPastData(date);
    const arr = [] // array of objects with same information but the temperature is now current temperature - past temperature

    for (let i = 0; i < currentData.results.length; i++) {
      const obj = {
        info: {
          requestState: currentData.results[i].info.requestState.name,
          temperature: currentData.results[i].info.temperature - pastData.results[i].info.temperature
        }
      }
      arr.push(obj);
    }

    setInfo({ results: arr });
  }

  async function pastInfo() {
    setIsLoading(true);

    console.log(value);
    const currentDate = dayjs(value); // Get the current date as a Day.js object
    const formattedDate = currentDate.format('YYYY-MM-DD'); // Format the date as 'YYYY-MM-DD' string


    console.log(formattedDate);

    const pastData = await fetchPastData(formattedDate);
    setInfo(pastData);
  }






  useEffect(() => {
    currentInfo();
  }, [])

  useEffect(() => {
    console.log("info changed:", info);

    if (info.results) {
      const temperatures = info.results.map(d => d.info.temperature);
      const minTemperature = Math.min(...temperatures);
      const maxTemperature = Math.max(...temperatures);

      const colorScale = d3
        .scaleSequential()
        .interpolator(d3.interpolateRdYlBu)
        .domain([maxTemperature, minTemperature]);

      console.log("updating mapData with info:", info.results);
      const mapData = info.results.reduce((acc, d) => {
        acc[d.info.requestState.name] = colorScale(d.info.temperature);
        return acc;
      }, {});
      setMapData(mapData);
      setIsLoading(false);
    }
  }, [info])

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 2, backgroundColor: '#0a0a0a' }}>
        <Typography variant="h2" sx={{ marginBottom: 1, fontFamily: 'monospace', color: '#c6d300' }}>U.S. State Temperature Map</Typography>
        <Typography variant="h6" sx={{ marginBottom: 1, fontFamily: 'monospace', color: '#ffffff' }}>Discover the temperature patterns across the United States</Typography>
        <Typography variant="body1" sx={{ maxWidth: '80%', marginBottom: 2, fontFamily: 'monospace', color: '#cccccc' }}>This map shows the temperature of each state in the United States. The colors represent the temperature of each state. The darker the color, the colder the temperature. The lighter the color, the warmer the temperature. The temperature is measured in degrees Fahrenheit.</Typography>
      </Box>


      <Stack direction="column" alignItems="center" spacing={2}>

        <Box sx={{ position: 'relative', width: 'min(80vw, 80vh)', display: 'flex', alignItems: 'center', margin: '0 auto' }}>

          <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
            {/* UNDO  */}
            {/* I want a stack containing 2 elements, o
            <Stack direction="row" alignItems="center" spacing={2} sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(50, 50, 50, 0.7)', zIndex: 1 }}>
            */}
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
          {/*</Stack>*/}
          </div>
        </Box >
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
                <Button variant="contained" onClick={compareInfo} disabled>
                  Compare
                </Button>
              </Grid>

              <Grid item>
                <Stack direction="column" spacing={2}>
                  <Button variant="contained" onClick={pastInfo}>
                    Past
                  </Button>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>


                    <DatePicker
                      label="Controlled picker"
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                      
                    />

                  </LocalizationProvider>
                </Stack>
              </Grid>
            </Grid>

          </Box>
        </Box>

      </Stack>
    </Box>
  );
}

// This is the box i want to center  <Box sx={{ maxWidth: '80vw', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 2, backgroundColor: '#c6d300', borderRadius: 4 }}>