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
  { name: 'Data Science', students: 1200 },
  { name: 'Web Development', students: 980 },
  { name: 'AI/ML', students: 850 },
  { name: 'Cloud Computing', students: 720 },
  { name: 'Cybersecurity', students: 650 },
];

const TopCoursesGraph: React.FC = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px] bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Top Courses by Student Enrollment</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={60}
            tick={{ fill: '#4B5563', fontSize: 12 }}
          />
          <YAxis
            tick={{ fill: '#4B5563', fontSize: 12 }}
            tickFormatter={(value) => `${value.toLocaleString()}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number) => [`${value.toLocaleString()} students`, 'Enrollment']}
          />
          <Legend />
          <Bar
            dataKey="students"
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopCoursesGraph;
