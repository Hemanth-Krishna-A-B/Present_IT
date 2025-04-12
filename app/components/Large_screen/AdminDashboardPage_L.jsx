
import SidebarButtons from "../admindashboard/SidebarButtons";
import LeftPanel from "../admindashboard/LeftPanel";
import MainContent from "../admindashboard/MainContent";
import BottomPanel from "../admindashboard/BottomPanel";
import RightTop from "../admindashboard/RightTop";
import RightBottom from "../admindashboard/RightBottom";


export default function AdminDashboardPage_L() {
  return (
    <div className="h-[calc(100vh-56px)] w-full flex p-2 gap-2">
      {/* Left Sidebar */}
      <div className="flex flex-col w-36 gap-2">
        <div className="p-2 flex-none">
          <SidebarButtons />
        </div>
        <div className="flex-1 shadow-md p-2 min-h-0">
          <LeftPanel />
        </div>
      </div>

      {/* Main Content + Bottom */}
      <div className="flex flex-col flex-1 gap-2 min-h-0 overflow-hidden">
        <div className="flex-1 min-h-0 overflow-hidden">
          <div className="h-full p-1 overflow-auto">
            <MainContent />
          </div>
        </div>
        <div className="h-52 shadow-md p-2 bg-white rounded-lg">
          <BottomPanel />
        </div>
      </div>

      <div className="flex flex-col w-52 gap-2">
        <div className="flex-1 shadow-md p-2 min-h-0">
          <RightTop />
        </div>
        <div className="flex-1 shadow-md p-2 min-h-0">
          <RightBottom />
        </div>
      </div>

    </div>
  );
}
