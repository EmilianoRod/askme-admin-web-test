/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Pie } from '@nivo/pie';

export interface ChartProps {
  dataChart: { id: number | string; value: number; color: string }[];
  getColor: (
    pie: any,
    dataChart: {
      id: string | number;
      value: number;
      color: string;
    }[],
  ) => string;
  size: number;
}
// eslint-disable-next-line react/prop-types
const DoughnutChart = ({ dataChart, getColor, size }: ChartProps) => {
  return (
    <Pie
      data={dataChart}
      min-width={0}
      width={size}
      height={size}
      margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
      startAngle={-180}
      innerRadius={0.4}
      colors={(pie) => getColor(pie, dataChart)}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      enableRadialLabels={false}
      radialLabelsSkipAngle={0}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: 'color' }}
      enableSlicesLabels={false}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default DoughnutChart;
