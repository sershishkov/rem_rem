import type { Metadata } from 'next';

import TemplContractAddEdit from '../TemplContractAddEdit';

const title = 'Создать шаблона контракта';

export const metadata: Metadata = {
  title: title,
};

export default function UnitAdd() {
  return <TemplContractAddEdit mode='add' title={title} />;
}
