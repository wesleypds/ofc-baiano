import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const ButtonRegister = ({ handleSubmit, title }) => {
  return (
    <Button onClick={handleSubmit} variant="contained" endIcon={<SendIcon />} className="me-3">
      {title}
    </Button>
  );
};

export default ButtonRegister;
