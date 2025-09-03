import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { PollResults } from "./PollResults";

type PollResultChartProps = {
  results: PollResults;
};

const PollResultChart: React.FC<PollResultChartProps> = ({ results }) => {
  // Memoize data transformation for performance
  const data = useMemo(
    () =>
      Object.entries(results).map(([option, votes]) => ({
        option,
        votes,
      })),
    [results]
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="option" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="votes" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PollResultChart;