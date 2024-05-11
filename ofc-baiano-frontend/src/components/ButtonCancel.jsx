import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

const ButtonCancel = ({ route }) => {
  const locationUrl = useLocation();
  const navigate = useNavigate();
  const redirect = () => {
    const token  = locationUrl.state.token;
    const userInfo = locationUrl.state.userInfo;
    navigate(route, { state: { token,  userInfo }});
  }

  return (
    <Button onClick={redirect} variant="contained" color="error" startIcon={<CancelIcon/>}>
      Cancelar
    </Button>
  );
};

export default ButtonCancel;
