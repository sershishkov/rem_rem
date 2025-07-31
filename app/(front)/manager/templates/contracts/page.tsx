import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/templates/contracts`;

const title = 'Шаблоны контрактов';

export const metadata: Metadata = {
  title: title,
};

export default function ContractTemplateList() {
  const headerFields = ['Название шаблона контракта'];
  const tableFields = ['templateContractName'];
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={title}
      />
    </>
  );
}
