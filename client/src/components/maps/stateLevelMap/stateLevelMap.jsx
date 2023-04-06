import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import * as d3 from 'd3';
import { Button, Box, Grid } from '@mui/material';

export default function StateLevelMap() {
  const [info, setInfo] = useState({});
  const [mapData, setMapData] = useState({});

  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

  async function fetchData() {
    const response = await fetch('/weather');
    const data = await response.json();
    setInfo(data)
    console.log(data)
  }




  useEffect(() => {
    fetchData()
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
    }
  }, [info])

  return (

    <Box sx={{ width: '100%', height: '100%' }}>

    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={mapData[geo.properties.name] || "#EEE"}
            />
          ))
        }
      </Geographies>
    </ComposableMap>

    <Grid container spacing={2} sx={{ position: 'absolute', top: 0, left: 0, p: 2 }}>
      <Grid item>
        <Button variant="contained" onClick={fetchData}>Current</Button>
      </Grid>
    </Grid>

    
    </Box>
  );
}
