import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { course: "Computer Science", students: 1200000 },
  { course: "Business Management", students: 950000 },
  { course: "Engineering", students: 870000 },
  { course: "Medicine", students: 760000 },
  { course: "Law", students: 600000 },
  { course: "Psychology", students: 500000 },
  { course: "Education", students: 450000 },
];

const TopCoursesGraph: React.FC = () => {
  return (
    <div className="w-full h-[500px] p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Top Courses in the World (by Students)
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} layout="vertical" margin={{ left: 50, right: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="course" type="category" width={150} />
          <Tooltip />
          <Legend />
          <Bar dataKey="students" fill="#4F46E5" name="Students Enrolled" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopCoursesGraph;
