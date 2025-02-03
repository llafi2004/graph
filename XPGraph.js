import React from "react";

const XPGraph = ({ transactions }) => {
  if (!transactions.length) return <p>No data available.</p>;

  const width = 500, height = 300, padding = 40;
  const maxXP = Math.max(...transactions.map(d => d.amount));

  const xScale = (index) => padding + (index * (width - padding * 2)) / (transactions.length - 1);
  const yScale = (xp) => height - padding - (xp * (height - padding * 2)) / maxXP;

  return (
    <svg width={width} height={height}>
      {transactions.map((tx, index) => (
        <circle key={index} cx={xScale(index)} cy={yScale(tx.amount)} r={5} fill="blue" />
      ))}
    </svg>
  );
};

export default XPGraph;
