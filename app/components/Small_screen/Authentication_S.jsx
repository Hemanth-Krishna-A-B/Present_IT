import AuthForm from "../Common_screen/AuthForm";
import EngagePresentationForm from "../Common_screen/EngagePresentationForm";

export default function AuthenticationPage_S() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-4 gap-4">
      
      {/* Top container */}
      <div className="bg-white p-4 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-2">Welcome to Present_IT</h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          Present_IT is a dynamic platform that helps you create engaging presentations, manage questions,
          and facilitate interactive sessions. Whether you're preparing for a conference, a class discussion,
          or a team meeting, Present_IT allows you to create questions, share them with your audience, and
          gather feedback in real-time. Experience the future of presentations and audience engagement with ease and fun!
        </p>
      </div>

      {/* Middle container - AuthForm */}
      <AuthForm/>

      {/* Bottom container - Engage Form */}
      <EngagePresentationForm/>
    </div>
  );
}
