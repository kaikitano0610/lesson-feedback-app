
import ReactDOM from "react-dom/client";
import AppRoutes from './routes';
import NavBar from './components/NavBar' 
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
<>
    <BrowserRouter>
        <NavBar />
        <AppRoutes />
    </BrowserRouter>

</>
);