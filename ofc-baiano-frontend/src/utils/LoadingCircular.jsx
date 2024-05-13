import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export const LoadingCircular = ({text}) => {
    return (
        <Box sx={{ }}>
          <h4><b>{text}</b></h4>
          <CircularProgress />
        </Box>
    );
};

export default LoadingCircular;