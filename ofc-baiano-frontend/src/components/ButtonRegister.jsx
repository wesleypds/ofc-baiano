import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const ButtonRegister = ({ route }) => {
  const locationUrl = useLocation();
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const token  = locationUrl.state.token;
    const userInfo = locationUrl.state.userInfo;
    navigate(route, { state: { token,  userInfo }});
  }

  return (
    <Button onSubmit={handleSubmit} variant="contained" endIcon={<SendIcon />} className="me-3">
      Cadastrar
    </Button>
  );
};

export default ButtonRegister;
