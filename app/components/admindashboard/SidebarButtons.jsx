import { useState } from "react";

export default function SidebarButtons() {
  const [presenting, setPresenting] = useState(false);
  const [code, setCode] = useState(null);

  const handlePresentClick = () => {
    if (presenting) {
      setPresenting(false);
      setCode(null);
    } else {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      setCode(randomCode);
      setPresenting(true);
    }
  };

  const handleButtonClick = (buttonName) => {
    console.log(`${buttonName} clicked`);
  };

  return (
    <div className="flex flex-col gap-3 p-2">
      <button
        className="bg-green-600 px-4 py-2 rounded text-white font-semibold text-base shadow-md hover:bg-red-500 transition"
        onClick={handlePresentClick}
      >
        {presenting ? code : "Present It"}
      </button>

      

      
    </div>
  );
}
