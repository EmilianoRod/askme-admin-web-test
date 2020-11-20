/* eslint-disable no-unused-expressions */
import React, { useCallback } from 'react';

import { LINE, BAR, MULTIPLE_CHOICE, DOUGHNUT, SCALE_TYPE, TOTAL_ANSWERS } from 'Utils/constants';
import { company_company_surveys_active_areas } from 'api/__generated__/company';
import {
  QuestionsAnswers_questionsAnswers_areas,
  QuestionsAnswers_questionsAnswers_areas_data_data_answers_answers,
} from 'api/__generated__/questionsAnswers';
import theme from 'theme';
import { ChartType } from './ChartCard';
import LineChart from './LineChart';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import { Label, RowContainer, Legends, HidableContainer, ColumnContainer, Square } from './styles';
import ResponsiveDoughnut from './ResponsiveDoughnut';

export interface ChartProps {
  selectedChart: ChartType;
  data: QuestionsAnswers_questionsAnswers_areas[];
  areas: company_company_surveys_active_areas[];
  type: string;
  details?: boolean;
}

const Chart = ({ selectedChart, data, areas, type, details }: ChartProps): JSX.Element => {
  const renderLineChart = useCallback(() => {
    const chartData = data.map((chartArea, index) => {
      const areaData = chartArea?.data?.map((answer) => {
        return type === SCALE_TYPE
          ? {
              x: answer.date,
              y: answer.data_answers?.nps || 0,
            }
          : {
              x: answer.date,
              y: answer.data_answers?.csat || 0,
            };
      });
      const area = areas.find((branchArea) => branchArea?.id === chartArea?.area?.id);
      const areaReference = `${area?.branch?.name} - ${area?.name}`;
      return {
        id: areaReference,
        color: theme.palette.charts[index],
        data: areaData,
      };
    });
    return <LineChart data={chartData} details={details} isNPS={type === SCALE_TYPE} />;
  }, [data, areas]);

  const renderPieChart = (
    chartData: {
      id: string;
      data: {
        id: string | number;
        value: number;
        color: string;
      }[];
      total?: number;
    }[],
    getColor: (
      pie: any,
      dataChart: {
        id: string | number;
        value: number;
        color: string;
      }[],
    ) => string,
  ) => {
    const filteredData = chartData.filter((area) => area.data.length > 0);
    if (!filteredData.length) return null;
    if (areas.length > 1) {
      const amountCharts = filteredData.length;
      const chartWidth = amountCharts <= 4 ? 50 : 25;
      return filteredData.map((anArea) => {
        const areaData = areas.find((area) => area.id === anArea.id);
        if (anArea.data.length > 0) {
          if (!details)
            return (
              <RowContainer
                className={amountCharts > 1 ? 'center size' : 'size center charts'}
                key={areaData?.id}
              >
                <HidableContainer className="fixedWidth">
                  <Label className="bold small">{areaData?.branch?.name}</Label>
                  <br />
                  <Label className="small">{areaData?.name}</Label>
                </HidableContainer>
                <DoughnutChart
                  dataChart={anArea.data}
                  getColor={getColor}
                  size={amountCharts > 1 ? 160 : 220}
                />
              </RowContainer>
            );

          return (
            <ColumnContainer
              className="chart"
              key={areaData?.id}
              style={{ width: `${chartWidth}%`, minWidth: 120 }}
            >
              <ResponsiveDoughnut dataChart={anArea.data} getColor={getColor} size={0} />
              <HidableContainer>
                <Label className="bold small">{areaData?.branch?.name}</Label>
                <Label className="small">{areaData?.name}</Label>
              </HidableContainer>
              {anArea.total && (
                <HidableContainer>
                  <Label className="small">{`${TOTAL_ANSWERS}:  `}</Label>
                  <Label className="bold small margin">{anArea.total}</Label>
                </HidableContainer>
              )}
            </ColumnContainer>
          );
        }
        return null;
      });
    }
    return (
      <DoughnutChart
        dataChart={chartData[0]?.data}
        getColor={getColor}
        size={details ? 400 : 250}
      />
    );
  };

  const renderDoughnutChart = (): JSX.Element => {
    const filteredData = data.filter((anArea) => anArea.total > 0);
    const chartData = filteredData.map((anArea) => {
      const values = type === SCALE_TYPE ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : [0, 0, 0, 0, 0];
      anArea?.data?.forEach((day) => {
        day.data_answers?.answers?.forEach(
          (answer: QuestionsAnswers_questionsAnswers_areas_data_data_answers_answers) => {
            if (answer.value && answer?.quantity) {
              if (type === SCALE_TYPE) values[parseInt(answer?.value, 10)] += answer?.quantity;
              else values[parseInt(answer?.value, 10) - 1] += answer?.quantity;
            }
          },
        );
      });
      return {
        id: anArea.area.id,
        data: values.map((value, index) => {
          return {
            id: type === SCALE_TYPE ? index : index + 1,
            value,
            color: type === SCALE_TYPE ? theme.palette.scale[index] : theme.palette.faces[index],
          };
        }),
        total: anArea.total,
      };
    });
    const getColor = (
      pie: any,
      dataChart: {
        id: string | number;
        value: number;
        color: string;
      }[],
    ) => {
      return type === SCALE_TYPE ? dataChart[pie.id]?.color : dataChart[pie.id - 1]?.color;
    };
    return renderPieChart(chartData, getColor) as JSX.Element;
  };

  const renderBarChart = () => {
    const dataAswers = data[0]?.data?.map((dateData) => {
      const object = {
        date: dateData.date,
        '1Color': '#FF4239',
        '2Color': '#FF853A',
        '3Color': '#FFC63B',
        '4Color': '#94BE38',
        '5Color': '#00B642',
      };

      if (dateData.data_answers.total !== '0') {
        return dateData?.data_answers?.answers?.reduce((accumulator, answer) => {
          return { ...accumulator, [parseInt(answer.value as string, 10)]: answer.quantity };
        }, object);
      }
      return object;
    });

    return (
      <BarChart
        chartData={
          dataAswers as {
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
          }[]
        }
      />
    );
  };

  const renderMultipleChoiceChart = () => {
    const isOptionInResultsArray = (
      answer: QuestionsAnswers_questionsAnswers_areas_data_data_answers_answers,
      values: {
        id: string;
        value: number;
      }[],
    ) => {
      return values.some((value) => value.id === answer.value);
    };
    const isOptionInColorArray = (
      answer: QuestionsAnswers_questionsAnswers_areas_data_data_answers_answers,
      colorAssigment: { id: string; color: string }[],
    ) => {
      return colorAssigment.some((color) => color.id === answer.value);
    };

    const colorAssigment: { id: string; color: string }[] = [];
    let colorIndex = 0;

    const chartData = data.map((anArea) => {
      const values: { id: string; value: number }[] = [];
      anArea?.data?.forEach((day) => {
        day.data_answers?.answers?.forEach((answer) => {
          if (answer.value && answer.quantity) {
            if (!isOptionInResultsArray(answer, values)) {
              values.push({
                id: answer.value,
                value: answer.quantity,
              });
              if (!isOptionInColorArray(answer, colorAssigment)) {
                colorAssigment.push({ id: answer.value, color: theme.palette.charts[colorIndex] });
                colorIndex += 1;
              }
            } else {
              values.forEach((value) => {
                if (answer.quantity && value.id === answer.value) value.value += answer.quantity;
              });
            }
          }
        });
      });
      return {
        id: anArea.area.id,
        data: values.map((value) => {
          const { id, value: amount } = value;
          return {
            id,
            value: amount,
            color: colorAssigment.find((color) => color.id === id)?.color || '#71C69D',
          };
        }),
      };
    });

    const getColor = (
      pie: any,
      dataChart: {
        id: string | number;
        value: number;
        color: string;
      }[],
    ) => {
      const color = dataChart.find((item) => item.id === pie.id)?.color;
      return color || '#71C69D';
    };

    return (
      <RowContainer className="large center size charts">
        <RowContainer className="charts size legends min">
          {renderPieChart(chartData, getColor)}
        </RowContainer>
        {!details && (
          <Legends>
            {colorAssigment.map((aColor) => (
              <RowContainer className="top center" key={aColor.color}>
                <Square style={{ backgroundColor: aColor.color }} />
                <div>{aColor.id}</div>
              </RowContainer>
            ))}
          </Legends>
        )}
      </RowContainer>
    );
  };

  switch (selectedChart) {
    case LINE:
      return renderLineChart();
    case BAR:
      return renderBarChart();
    case MULTIPLE_CHOICE:
      return renderMultipleChoiceChart();
    case DOUGHNUT:
      return renderDoughnutChart();
    default:
      return renderLineChart();
  }
};

export default Chart;
