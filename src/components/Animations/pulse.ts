import { keyframes } from '@mui/material';

const pulse = keyframes`
    0% {
        box-shadow: 0 0 3px grey, 0 0 6px grey, 0 0 9px grey, 0 0 12px grey;
    }
    50% {
        box-shadow: 0 0 5px grey, 0 0 10px grey, 0 0 15px grey, 0 0 20px grey;
    }
    100% {
        box-shadow: 0 0 3px grey, 0 0 6px grey, 0 0 9px grey, 0 0 12px grey;
    }
`;

export default pulse;