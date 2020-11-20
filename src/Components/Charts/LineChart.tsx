/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
import React, { useMemo, useState } from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';

import { ToolTip } from './styles';
import { CSAT, NPS, DATE } from '../../Utils/constants';

export interface LineChartProps {
  data: {
    id: string;
    data:
      | {
          x: string;
          y: number | null | undefined;
        }[]
      | undefined;
  }[];
  details?: boolean;
  isNPS: boolean;
}

const LineChart = ({ data, details, isNPS }: LineChartProps) => {
  const [toolTip, setToolTip] = useState('');
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

  const getMinValue = () => {
    let min: number = Number.MAX_SAFE_INTEGER;

    data.forEach((branch) => {
      branch?.data?.forEach(({ y }) => {
        if (y != null && y < min) {
          min = y;
        }
      });
    });
    return min;
  };

  const minValue = useMemo(() => getMinValue(), [data]);

  const getAmount = (min: boolean) => {
    const values: number[] = [];
    data.forEach((branch) => {
      branch?.data?.forEach(({ y }) => {
        if (y != null && !values.includes(y)) {
          values.push(y);
        }
      });
    });
    const separation = 2;
    const maximum = 100;
    const minimum = isNPS ? -100 : 0;
    let ret;
    if (minValue < minimum + separation) {
      ret = min ? minimum : minimum + separation * 2;
    } else if (minValue > maximum - separation) {
      ret = min ? maximum - separation * 2 : maximum;
    } else {
      ret = min ? minValue - separation : minValue + separation;
    }
    return values.length === 1 ? ret : 'auto';
  };

  const memorizedTrueAmount = useMemo(() => getAmount(true), [data]);
  const memorizedFalseAmouny = useMemo(() => getAmount(false), [data]);

  return (
    data && (
      <>
        <ToolTip>{toolTip}</ToolTip>
        <ResponsiveLine
          data={data as Serie[]}
          margin={{ top: 10, right: details ? 190 : 140, bottom: 50, left: 50 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: memorizedTrueAmount,
            max: memorizedFalseAmouny,
            stacked: false,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 10,
            tickPadding: 9,
            tickRotation: 0,
            legend: DATE,
            legendOffset: 46,
            legendPosition: 'middle',
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
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -40,
            legend: isNPS ? NPS : CSAT,
            legendPosition: 'middle',
          }}
          enableGridX={false}
          colors={(d) => d.color}
          enablePoints={false}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="y"
          pointLabelYOffset={-12}
          enableArea
          areaBaselineValue={minValue}
          areaOpacity={0.1}
          isInteractive={false}
          enableCrosshair={false}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: details ? 90 : 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              onMouseEnter: (singleData) => setToolTip(singleData.id.toString()),
              onMouseLeave: () => setToolTip(''),
            },
          ]}
          animate
          defs={[
            {
              id: 'gradientC',
              type: 'linearGradient',
              colors: [
                { offset: 0, color: 'inherit', opacity: 1 },
                { offset: 100, color: 'inherit', opacity: 0 },
              ],
            },
          ]}
          fill={[{ match: '*', id: 'gradientC' }]}
        />
      </>
    )
  );
};

export default LineChart;
