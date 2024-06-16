import { useNavigate, useLocation, useParams } from "react-router-dom";


const redirectPage = (page,locationUrl, navigate) => {

  const token = locationUrl.state.token;
  const userInfo = locationUrl.state.userInfo;

  navigate("/" + page, { state: { token, userInfo } });
};

const loadModulePost = async (action) => {
    const module = await import("../../services/"+action+"/"+action+"Service.js");
    return module.SendFormPost;
}

const loadModulePut = async (action) => {
  const module = await import("../../services/"+action+"/"+action+"Service.js");
  return module.SendFormPut;
}

export const HandleSubmitForm = (id, routePage, dataForm, setIsInvalidForm, setMsgInvalidForm,locationUrl, navigate) => {
    if (id) {
      (async () => {
        const SendFormPut = await loadModulePut(routePage.slice(0, -1));
        var response = await SendFormPut(dataForm);

        if (response.success) {
          redirectPage(routePage, locationUrl, navigate);
        } else {
          setIsInvalidForm(true)
          setMsgInvalidForm(response.errorMsg)
        }
      })()
    } else {
      (async () => {

        const SendFormPost = await loadModulePost(routePage.slice(0, -1));

        var response = await SendFormPost(dataForm);
        if (response.success) {
          redirectPage(routePage, locationUrl, navigate);

        } else {
          setIsInvalidForm(true)
          setMsgInvalidForm(response.errorMsg)
        }
      })();
    }
  };
