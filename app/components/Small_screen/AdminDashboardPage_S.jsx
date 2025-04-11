import BottomPanel from "../admindashboard/BottomPanel";
import MainContent from "../admindashboard/MainContent";
import RightTop from "../admindashboard/RightTop";
import SidebarButtons from "../admindashboard/SidebarButtons";

export default function AdminDashboardPage_S() {
  return (
    <div className="flex flex-col gap-4 p-4 min-h-screen w-full">
      {/* Sidebar Buttons */}
      <div className=" p-3 w-full">
        <SidebarButtons />
      </div>

      {/* Main Content */}
      <div className="shadow-md p-4 w-full">
        <MainContent />
      </div>
      {/* Right Top */}
      <div className="border-2 shadow-md p-3 text-white w-full">
        <RightTop />
      </div>

      {/* Bottom Panel */}
      <div className=" shadow-md p-4 w-full">
        <BottomPanel />
      </div>
    </div>
  );
}
