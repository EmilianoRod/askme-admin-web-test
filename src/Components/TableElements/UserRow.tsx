import React from 'react';
import { BsThreeDots } from 'react-icons/bs';

import PopperComponent from 'Components/Popper/PopperComponent';
import { tabletUsers_company_tablet_users } from 'api/__generated__/tabletUsers';
import { USER } from 'Utils/constants';
import { Row, Cell } from './styles';

export interface RowProps {
  data: tabletUsers_company_tablet_users;
}

const UserRow = ({ data: { email, area, id } }: RowProps) => (
  <Row>
    <Cell>{email}</Cell>
    <Cell>{`${area?.name} ${area?.branch?.name}`}</Cell>
    <Cell>
      <PopperComponent type={USER} id={id} button={<BsThreeDots size="20" />} />
    </Cell>
  </Row>
);

export default UserRow;
