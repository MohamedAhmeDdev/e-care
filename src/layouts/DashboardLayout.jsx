import { Outlet } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import { SidebarProvider } from "../context/SidebarContext";


const DashboardLayout = () => {
	return (
		<SidebarProvider>
			<div className="flex h-screen bg-white text-black overflow-hidden">
				<Sidebar />
				
					<div className="flex-1 overflow-auto mt-14">
						<Outlet />
					</div>
			</div>
		</SidebarProvider>
	);
};


export default DashboardLayout;
