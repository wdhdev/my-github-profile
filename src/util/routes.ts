import auth from "../endpoints/api/auth";
import callback from "../endpoints/api/callback";
import logout from "../endpoints/api/logout";
import index from "../endpoints/index";

export default {
    api: {
        auth: auth,
        callback: callback,
        logout: logout
    },
    index: index
}
