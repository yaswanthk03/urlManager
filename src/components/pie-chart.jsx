/* eslint-disable react/prop-types */
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// function to export pie chart for a given parameter in the stats
// stats: array of objects containing the stats
// value: string, parameter to count in the stats
// return: pie chart
export default function App({ stats, value }) {
  const valueCount = stats.reduce((acc, item) => {
    if (!item[value]) {
      item[value] = "Null";
    }
    if (!acc[item[value]]) {
      acc[item[value]] = 0;
    }
    acc[item[value]]++;
    return acc;
  }, {});

  const result = Object.keys(valueCount).map((device) => ({
    device,
    count: valueCount[device],
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart width={700} height={400}>
          <Pie
            data={result}
            labelLine={false}
            label={({ device, percent }) =>
              `${device}: ${(percent * 100).toFixed(0)}%`
            }
            dataKey="count"
          >
            {result.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
