/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

import { RESULTS_NUMER, DATE } from '../../Utils/constants';

export interface BarChartProps {
  chartData: {
    date: string;
    1: number;
    '1Color': string;
    2: number;
    '2Color': string;
    3: number;
    '3Color': string;
    4: number;
    '4Color': string;
    5: number;
    '5Color': string;
  }[];
}

const BarChart = ({ chartData }: BarChartProps) => {
  const getTspanGroups = (value: string, maxLineLength = 4, maxLines = 2) => {
    const words = value.split(' ');

    type linesAcc = {
      lines: string[];
      currLine: string;
    };

    const assembleLines: linesAcc = words.reduce(
      (acc: linesAcc, word: string) => {
        if ((word + acc.currLine).length > maxLineLength && acc.currLine !== '') {
          return {
            lines: acc.lines.concat([acc.currLine]),
            currLine: word,
          };
        }
        return {
          ...acc,
          currLine: `${acc.currLine} ${word}`,
        };
      },
      { lines: [], currLine: '' },
    );
    const allLines = assembleLines.lines.concat([assembleLines.currLine]);

    const lines = allLines.slice(0, maxLines);
    const children: JSX.Element[] = [];
    let dy = 0;

    lines.forEach((lineText, i) => {
      children.push(
        // eslint-disable-next-line react/no-array-index-key
        <tspan x={0} dy={dy} key={i}>
          {i === 1 && allLines.length > 2 ? `${lineText.slice(0, maxLineLength - 3)}...` : lineText}
        </tspan>,
      );
      dy += 15;
    });

    return children;
  };

  const getTicketValues = () => {
    let max = 0;
    const days: (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];
    chartData.forEach((day) => {
      days.forEach((number) => {
        if (day[number] && day[number] > max) max = day[number];
      });
    });
    return max > 4 ? 6 : max;
  };

  return (
    <ResponsiveBar
      data={chartData}
      keys={['1', '2', '3', '4', '5']}
      indexBy="date"
      margin={{ top: 10, right: 60, bottom: 50, left: 40 }}
      padding={0.6}
      colors={({ id, data }) => data[`${id}Color`]}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 10,
        tickRotation: 0,
        legendPosition: 'middle',
        legend: DATE,
        legendOffset: 45,
        renderTick: ({ opacity, textAnchor, textBaseline, textX, textY, value, x, y }: any) => {
          return (
            <g transform={`translate(${x},${y})`} style={{ opacity }}>
              <text
                alignmentBaseline={textBaseline}
                textAnchor={textAnchor}
                transform={`translate(${textX},${textY})`}
                style={{ fontSize: 10 }}
              >
                {getTspanGroups(value)}
              </text>
            </g>
          );
        },
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 0,
        tickRotation: 0,
        legend: RESULTS_NUMER,
        legendPosition: 'middle',
        legendOffset: -35,
        tickValues: getTicketValues(),
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      animate
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default BarChart;
