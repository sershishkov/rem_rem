import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import TemplContractAddEdit from '../TemplContractAddEdit';

const title = 'Редактировать шаблона контракта';

export const metadata: Metadata = {
  title: title,
};

export default async function UnitEdit({ params }: Readonly<ParamsProps>) {
  const { id } = await params;

  return <TemplContractAddEdit id={id} mode='edit' title={title} />;
}
