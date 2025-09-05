import React, { useEffect, useMemo } from "react";
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

/**
 * Creates a new poll in the database.
 * Validates input fields and ensures at least two options are provided.
 * On success, redirects to the poll page.
 */
const handleCreatePoll = async () => {
  // Validate that poll title and at least two options are provided
  if (!title || options.length < 2) {
    setError('Please provide a title and at least two options.');
    return;
  }
  // ...existing code...
}

/**
 * Submits a user's vote for a poll option.
 * Prevents duplicate voting by checking if the user has already voted.
 *
 * @param optionId - The ID of the selected poll option
 */
const handleVote = async (optionId: string) => {
  // Prevent voting if user has already voted
  if (hasVoted) {
    setError('You have already voted.');
    return;
  }
  // ...existing code...
}

/**
 * Displays the user's dashboard with their polls and voting history.
 * Fetches data from Supabase and handles loading/error states.
 */
const Dashboard = () => {
  // Fetch user's polls and votes on component mount
  useEffect(() => {
    // ...existing code...
  }, []);
  // ...existing code...
}

export default PollResultChart;