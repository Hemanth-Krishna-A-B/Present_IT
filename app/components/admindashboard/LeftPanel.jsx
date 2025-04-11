export default function LeftPanel() {
  const regNumbers = [
    "REG2025001",
    "REG2025002",
    "REG2025003",
    "REG2025004",
    "REG2025005",
    "REG2025006",
    "REG2025007",
    "REG2025008",
    "REG2025009",
    "REG2025010",
  ];

  return (
    <div className="h-full w-full text-black bg-white overflow-auto p-2 rounded [&::-webkit-scrollbar]:hidden scrollbar-hide">
      <h2 className="text-sm font-semibold mb-3 border-b border-black pb-1">
        Active Students
      </h2>
      <ul className="space-y-2">
        {regNumbers.map((reg, index) => (
          <li
            key={index}
            className=" text-black py-2 text-center rounded shadow hover:bg-gray-800 hover:text-white transition"
          >
            {reg}
          </li>
        ))}
      </ul>
    </div>
  );
}
