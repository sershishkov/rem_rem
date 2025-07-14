import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import UnitAddEdit from '../UnitAddEdit';

const title = 'Редактировать Единицу измерения';

export const metadata: Metadata = {
  title: title,
};

export default async function UnitEdit({ params }: Readonly<ParamsProps>) {
  const { id } = await params;

  return <UnitAddEdit id={id} mode='edit' title={title} />;
}
