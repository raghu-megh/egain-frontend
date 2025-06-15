"use client";

import { useState, useEffect } from "react";
import { fetchFrequentVisitors, DomainVisitDto } from "../api/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#845EC2",
  "#D65DB1",
];

export default function FrequentVisitorsPage() {
  const [days, setDays] = useState(7);
  const [data, setData] = useState<DomainVisitDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetchFrequentVisitors(days)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Top Visitors (last {days} days)</h1>
      <div className="flex items-center gap-2 my-4">
        <label htmlFor="days">Days:</label>
        <input
          id="days"
          type="number"
          min="1"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="w-20 p-1 border rounded"
        />
        <button
          onClick={load}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Refresh
        </button>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {!loading && !error && data.length === 0 && <p>No data</p>}

      {!loading && !error && data.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="visits"
              nameKey="domain"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
