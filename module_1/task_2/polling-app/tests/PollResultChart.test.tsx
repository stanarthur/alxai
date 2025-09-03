import React from "react";
import { render, screen } from "@testing-library/react";
import PollResultChart from "../src/components/PollResultChart";
import { PollResults } from "../src/components/PollResults";

// tests/PollResultChart.test.tsx

// Mock recharts components
jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  BarChart: ({ children, data }: any) => (
    <div data-testid="barchart" data-data={JSON.stringify(data)}>
      {children}
    </div>
  ),
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="xaxis" />,
  YAxis: () => <div data-testid="yaxis" />,
  Tooltip: () => <div data-testid="tooltip" />,
}));

describe("PollResultChart", () => {
  const sampleResults: PollResults = {
    OptionA: 10,
    OptionB: 5,
    OptionC: 0,
  };

  it("renders chart components", () => {
    render(<PollResultChart results={sampleResults} />);
    expect(screen.getByTestId("barchart")).toBeInTheDocument();
    expect(screen.getByTestId("bar")).toBeInTheDocument();
    expect(screen.getByTestId("xaxis")).toBeInTheDocument();
    expect(screen.getByTestId("yaxis")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
  });

  it("passes correct data to BarChart", () => {
    render(<PollResultChart results={sampleResults} />);
    const barChart = screen.getByTestId("barchart");
    const data = JSON.parse(barChart.getAttribute("data-data") || "[]");
    expect(data).toEqual([
      { option: "OptionA", votes: 10 },
      { option: "OptionB", votes: 5 },
      { option: "OptionC", votes: 0 },
    ]);
  });

  it("renders correctly with empty results", () => {
    render(<PollResultChart results={{}} />);
    const barChart = screen.getByTestId("barchart");
    const data = JSON.parse(barChart.getAttribute("data-data") || "[]");
    expect(data).toEqual([]);
  });

  it("renders correctly with one option", () => {
    render(<PollResultChart results={{ OnlyOption: 7 }} />);
    const barChart = screen.getByTestId("barchart");
    const data = JSON.parse(barChart.getAttribute("data-data") || "[]");
    expect(data).toEqual([{ option: "OnlyOption", votes: 7 }]);
  });
});