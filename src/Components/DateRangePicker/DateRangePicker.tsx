import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/lib/date-picker/generatePicker';
import locale from 'antd/lib/date-picker/locale/es_ES';

import {
  THIS_WEEK,
  LAST_WEEK,
  THIS_MONTH,
  LAST_MONTH,
  THIS_YEAR,
  LAST_YEAR,
} from 'Utils/constants';
import './styles.css';

const { RangePicker } = generatePicker<Dayjs>(dayjsGenerateConfig);
export interface DateRangePickerProps {
  date: [Dayjs | null, Dayjs | null] | null;
  setDate: (date: [Dayjs | null, Dayjs | null] | null) => void;
}

export default function DateRangePicker({ date, setDate }: DateRangePickerProps) {
  return (
    <RangePicker
      size="large"
      ranges={{
        [THIS_WEEK]: [dayjs().startOf('week'), dayjs().endOf('week')],
        [LAST_WEEK]: [
          dayjs().subtract(1, 'week').startOf('week'),
          dayjs().subtract(1, 'week').endOf('week'),
        ],
        [THIS_MONTH]: [dayjs().startOf('month'), dayjs().endOf('month')],
        [LAST_MONTH]: [
          dayjs().subtract(1, 'month').startOf('month'),
          dayjs().subtract(1, 'month').endOf('month'),
        ],
        [THIS_YEAR]: [dayjs().startOf('year'), dayjs().endOf('year')],
        [LAST_YEAR]: [
          dayjs().subtract(1, 'year').startOf('year'),
          dayjs().subtract(1, 'year').endOf('year'),
        ],
      }}
      value={date}
      onCalendarChange={setDate}
      disabledDate={(current) => current > dayjs().endOf('day')}
      bordered={false}
      style={{ backgroundColor: '#fff' }}
      locale={locale}
    />
  );
}
