import { keyframes } from '@mui/material';

const pulse = keyframes`
    0% {
        box-shadow: 0 0 3px #00ff00, 0 0 6px #00ff00, 0 0 9px #00ff00, 0 0 12px #00ff00;
    }
    50% {
        box-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00, 0 0 20px #00ff00;
    }
    100% {
        box-shadow: 0 0 3px #00ff00, 0 0 6px #00ff00, 0 0 9px #00ff00, 0 0 12px #00ff00;
    }
`;

export default pulse;