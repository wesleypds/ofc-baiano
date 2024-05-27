import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const ButtonRegister = ({ handleSubmit }) => {
  return (
    <Button onClick={handleSubmit} variant="contained" endIcon={<SendIcon />} className="me-3">
      Cadastrar
    </Button>
  );
};

export default ButtonRegister;
