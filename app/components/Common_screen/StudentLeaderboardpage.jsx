"use client";

const students = [
  { rollNo: "20CS101", regNo: "2020CS001", points: 85 },
  { rollNo: "20CS102", regNo: "2020CS002", points: 92 },
  { rollNo: "20CS103", regNo: "2020CS003", points: 78 },
  { rollNo: "20CS104", regNo: "2020CS004", points: 95 },
  { rollNo: "20CS105", regNo: "2020CS005", points: 88 },
];

export default function StudentLeaderboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🏆 Leaderboard</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-gray-700">
            <thead>
              <tr className="bg-blue-100 text-blue-800 text-left">
                <th className="p-3 border-b border-blue-200">#</th>
                <th className="p-3 border-b border-blue-200">Roll Number</th>
                <th className="p-3 border-b border-blue-200">Reg No</th>
                <th className="p-3 border-b border-blue-200">Points</th>
              </tr>
            </thead>
            <tbody>
              {students
                .sort((a, b) => b.points - a.points)
                .map((student, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition">
                    <td className="p-3 border-b">{index + 1}</td>
                    <td className="p-3 border-b">{student.rollNo}</td>
                    <td className="p-3 border-b">{student.regNo}</td>
                    <td className="p-3 border-b font-semibold text-blue-700">{student.points}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
