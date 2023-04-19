import React, { createContext, useState, useEffect } from 'react';

export const StateContext = createContext();

const StateContextProvider = (props) => {
    const [state, setState] = useState();
    const [type, setType] = useState('regularFetch');
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState({});
    const [selected, setSelected] = useState();
    const [mapData, setMapData] = useState({});
    const [pastDate, setPastDate] = useState(dayjs('2022-04-17'));
    const [primaryDate, setPrimaryDate] = useState(dayjs('2022-04-17'));
    const [secondaryDate, setSecondaryDate] = useState(dayjs('2021-04-17'));
    const [menu, setMenu] = useState();

    const [name, setName] = useState('');
    const [abbreviation, setAbbreviation] = useState('');
    const [capital, setCapital] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const [date, setDate] = useState('');
    const [period, setPeriod] = useState('');
    const [temperature, setTemperature] = useState('');
    const [requestType, setRequestType] = useState('');

    const [keys, setKeys] = useState([]);
    const [values, setValues] = useState([]);
    const [datetime, setDatetime] = useState('');


    async function fetchData() {
        const response = await fetch('/weather');
        const data = await response.json();
        return data;
    }

    async function fetchPastData(date) {
        const url = /weather/ + date
        const response = await fetch(url);
        const data = await response.json();
        return data;
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
        return data;
    }

    async function compareInfo() {
        const data = await fetchComparisonData(primaryDate, secondaryDate);
        const primaryWeather = data.results.primaryWeather;
        for (let i = 0; i < data.length; i++) {
            primaryWeather[i].info.temperature = primaryWeather[i].info.temperature - secondaryWeather.results[i].info.temperature;
        }

        let info = {
            results: [],
            type: data.type,
        }

        info.results = primaryWeather

        let menu = {
            results: {
                primaryWeather: data.results.primaryWeather,
                secondaryWeather: data.results.secondaryWeather,
                type: data.type,
            }
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
        currentInfo();
    }, [])

    useEffect(() => {
        updateMap()
    }, [info])

    useEffect(() => {
        if (selected) {
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
                const foundCompareData = { ...foundPrimaryData }
                const foundCompareDataInfo = { ...foundPrimaryData.info }
                const temperatureDifference = foundPrimaryData.info.temperature - foundSecondaryData.info.temperature
                foundCompareDataInfo.temperature = temperatureDifference.toFixed(1)
                foundCompareDataInfo.period = "N/A"
                foundCompareDataInfo.date = `${secondaryDate} - ${primaryDate}`
                foundCompareData.info = foundCompareDataInfo
                const foundState = { foundPrimaryData, foundSecondaryData, foundCompareData }
                setType('compare')
                setState(foundState)
            }
        }
    }, [selected])

    useEffect(() => {
        setName(state?.requestState?.name ?? '');
        setAbbreviation(state?.requestState?.abbreviation ?? '');
        setCapital(state?.requestState?.capital ?? '');
        setLatitude(state?.requestState?.latitude ?? '');
        setLongitude(state?.requestState?.longitude ?? '');

        setDate(info?.date ?? '');
        setPeriod(info?.period ?? '');
        setTemperature(info?.temperature ?? '');
        setRequestType(info?.requestType ?? '');

        setTemperature(apiInfo?.Temperature ?? '');
        setKeys(Object.keys(apiInfo));
        setValues(Object.values(apiInfo));
        setDatetime(new Date(values[0]).toLocaleDateString());
    }, [state, info, apiInfo, values])

    const stateContext = useMemo(
        () => ({
            state,
            type,
            isLoading,
            info,
            selected,
            mapData,
            pastDate,
            primaryDate,
            secondaryDate,
            menu,
            name,
            abbreviation,
            capital,
            latitude,
            longitude,
            date,
            period,
            temperature,
            requestType,
            Temperature,
            keys,
            values,
            datetime,
            setState,
            setType,
            setIsLoading,
            setInfo,
            setSelected,
            setMapData,
            setPastDate,
            setPrimaryDate,
            setSecondaryDate,
            setMenu,
            setName,
            setAbbreviation,
            setCapital,
            setLatitude,
            setLongitude,
            setDate,
            setPeriod,
            setTemperature,
            setRequestType,
            setTemp,
            setKeys,
            setValues,
            setDatetime,
            currentInfo,
            pastInfo,
            compareInfo,

        }),
        [currentInfo, pastInfo, compareInfo, state, type, isLoading, info, selected, mapData, pastDate, primaryDate, secondaryDate, menu, name, abbreviation, capital, latitude, longitude, date, period, temperature, requestType, Temperature, keys, values, datetime,]
    );

    return (
        <StateContext.Provider value={stateContext}>
            {props.children}
        </StateContext.Provider>
    );
}

export default StateContextProvider;