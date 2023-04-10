import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Typography, Stack } from '@mui/material';






function Statistic(props) {



    const trendDirection = (props.temperature > 0)



    return (
        <Box>
            <Stack direction="row" spacing={1}>
                {trendDirection ? <ArrowDropUpIcon sx={{ color: 'green'}} /> : <ArrowDropDownIcon sx={{ color: 'red'}} />}
                <Typography >{props.temperature}º</Typography>
            </Stack>
        </Box>


    )
}

export default Statistic