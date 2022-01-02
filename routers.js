import { useRoutes } from "react-router-dom";
import Home from "./pages";

function Routers() {
    return useRoutes([
        {path: '/', element: <Home/>}
    ])
}

export default Routers;