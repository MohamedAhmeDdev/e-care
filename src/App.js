import {BrowserRouter , Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients/Clients";
import RegisterClient from "./pages/Clients/RegisterClient";
import EnrollClient from "./pages/Clients/EnrollClient";
import ClientProfile from "./pages/Clients/ClientProfile";
import Programs from "./pages/Program/Programs";
import CreateProgram from "./pages/Program/CreateProgram";
import ClientsPrograms from "./pages/Clients/ClientsPrograms";
import UpdateProgram from "./pages/Program/UpdateProgram";



function App() {
	return (
    <BrowserRouter>
      <Routes>
        {/* public auth pages */}
        <Route path="register" element={<Register />} />
        <Route path="login"    element={<Login />} />

        {/* protected dashboard layout */}
        <Route path="/" element={<DashboardLayout />}>
          {/* Dashboard “index” view */}
          <Route index element={<Dashboard />} />

          {/* client routes */}
          <Route path="clients" element={<Clients />} />
          <Route path="clients/new" element={<RegisterClient />} />
          <Route path="clients/:id/enroll" element={<EnrollClient />} />
          <Route path="clients/:id/programs" element={<ClientsPrograms />} />
          <Route path="clients/:id/profile" element={<ClientProfile />} />

          {/* program routes */}
          <Route path="programs" element={<Programs />} />
          <Route path="programs/new" element={<CreateProgram />} />
          <Route path="programs/:id/edit" element={<UpdateProgram />} />
        </Route>
      </Routes>
    </BrowserRouter>
	);
}

export default App;
