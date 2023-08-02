import { CircularProgress, Typography  , Box  } from '@mui/material';
export default function Loader() {
    return (
        <Box display={'flex'} alignItems={'center'} flexDirection={'column'}
             sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} >
            <CircularProgress size={100}/>
            <Typography sx={{mt:2}}>
                The rapport is being generated, please wait...
            </Typography>
        </Box>

    )
}