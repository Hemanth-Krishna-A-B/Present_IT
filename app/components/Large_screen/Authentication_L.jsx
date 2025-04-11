import AuthForm from "../Common_screen/AuthForm";
import EngagePresentationForm from "../Common_screen/EngagePresentationForm";
import { MonitorSmartphone } from "lucide-react";

export default function AuthenticationPage_L() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden min-h-[32rem]">

        {/* ========== Left Side ========== */}
        <div className="md:w-1/2 w-full bg-gradient-to-br from-blue-100 to-blue-300 p-8 hidden md:flex items-center justify-center">
          <div className="text-blue-900 max-w-md">
            <div className="flex items-center gap-2 mb-6">
              <MonitorSmartphone className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold">Present_IT</h1>
            </div>
            <h2 className="text-xl font-semibold mb-4">Engage Smarter, Present Better</h2>
            <p className="text-sm leading-relaxed">
              Present_IT is a dynamic platform that helps you create engaging presentations, manage questions,
              and facilitate interactive sessions. Whether you're preparing for a conference, class, or team meeting,
              Present_IT makes audience interaction smooth, responsive, and fun.
            </p>
          </div>
        </div>

        {/* ========== Right Side ========== */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 space-y-6 bg-white text-gray-500">
          <AuthForm />
          <EngagePresentationForm />
        </div>

      </div>
    </div>
  );
}
