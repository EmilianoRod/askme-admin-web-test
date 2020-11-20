import React from 'react';
import { BsThreeDots } from 'react-icons/bs';

import PopperComponent from 'Components/Popper/PopperComponent';
import { getAdmins_company_admin_users } from 'api/__generated__/getAdmins';
import { ADMINS, ADMIN_ES, VISUALIZATOR, VISUALIZATOR_USER } from 'Utils/constants';
import { Row, Cell } from './styles';

export interface RowProps {
  data: getAdmins_company_admin_users;
}

const AdminUserRow = ({ data }: RowProps) => (
  <Row>
    <Cell>{data.email}</Cell>
    <Cell>{data.type === VISUALIZATOR_USER ? VISUALIZATOR : ADMIN_ES}</Cell>
    <Cell>
      <PopperComponent type={ADMINS} id={data.id} button={<BsThreeDots size="20" />} />
    </Cell>
  </Row>
);
export default AdminUserRow;
