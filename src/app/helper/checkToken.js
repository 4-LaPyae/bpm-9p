import { reloadHandler } from "../../features/login/LoginSlice";

export const checkToken = (payload) => {
    if (payload.authorize === false) {
        // const navigate = useNavigate();
        localStorage.clear();
        location.reload();
        // navigate("/login");
    }
};
