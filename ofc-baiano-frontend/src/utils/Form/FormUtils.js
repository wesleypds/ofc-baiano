import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  SendFormPost,
  SendFormPut,
} from "../../services/usuario/usuarioService.js";


const redirectPage = (page,locationUrl, navigate) => {

  const token = locationUrl.state.token;
  const userInfo = locationUrl.state.userInfo;

  navigate("/" + page, { state: { token, userInfo } });
};


export const HandleSubmitForm = (id, routePage, dataForm, setIsInvalidForm,locationUrl, navigate) => {
    if (id) {
      (async () => {
        var response = await SendFormPut(dataForm);

        if (response.success) {
          redirectPage(routePage, locationUrl, navigate);
        } else {
          setIsInvalidForm(true)
        }
      })()
    } else {
      (async () => {
        var response = await SendFormPost(dataForm);
        if (response.success) {
          redirectPage(routePage, locationUrl, navigate);

        } else {
          setIsInvalidForm(true)
        }
      })();
    }
  };
