import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ClicksLinearGraph({ stats = [] }) {
  const dateCount = stats.reduce((acc, item) => {
    let date = new Date(item.created_at).toDateString();
    if (acc[date]) {
      acc[date] += 1;
    } else {
      acc[date] = 1;
    }
    return acc;
  }, {});

  const date = Object.entries(dateCount).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart width={700} height={300} data={date}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip labelStyle={{ color: "green" }} />

          <Legend />
          <Line type="linear" dataKey="count" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
