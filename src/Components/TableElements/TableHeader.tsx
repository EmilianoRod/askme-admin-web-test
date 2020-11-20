import React from 'react';

import { Head, Row, Element, TableDivider } from './styles';

export interface TableHeaderProps {
  fields: string[];
  widths: string[];
}

const TableHeader = ({ fields, widths }: TableHeaderProps) => (
  <Head>
    <Row className="head">
      {fields.map((field, index) => (
        <Element padding="none" align="left" style={{ width: widths[index] }} key={field}>
          {field}
        </Element>
      ))}
    </Row>
    <TableDivider />
  </Head>
);

export default TableHeader;
