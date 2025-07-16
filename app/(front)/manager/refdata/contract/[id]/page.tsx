import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import ContractAddEdit from '../ContractAddEdit';

const title = 'Редактировать Контракт';

export const metadata: Metadata = {
  title: title,
};

export default async function ContractEdit({ params }: Readonly<ParamsProps>) {
  const { id } = await params;
  return <ContractAddEdit id={id} mode='edit' title={title} />;
}
