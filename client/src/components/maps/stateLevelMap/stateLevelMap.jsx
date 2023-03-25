import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import * as d3 from 'd3';

export default function StateLevelMap() {
  const [info, setInfo] = useState({});
  const [mapData, setMapData] = useState({});

  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

  async function fetchData() {
    const response = await fetch('/states');
    const data = await response.json();
    setInfo(data)
    console.log(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    console.log("info changed:", info);
    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateRdYlBu)
      .domain([100, 0]);

    if (info.results) {
      console.log("updating mapData with info:", info.results);
      const mapData = info.results.reduce((acc, d) => {
        acc[d.name] = colorScale(d.temperature);
        return acc;
      }, {});
      setMapData(mapData);
    }
  }, [info])

  

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={mapData[geo.properties.name]}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
}
