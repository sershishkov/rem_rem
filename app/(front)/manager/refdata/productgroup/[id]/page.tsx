import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import ProductGrAddEdit from '../ProductGrAddEdit';

const title = 'Редактировать Группу товаров';

export const metadata: Metadata = {
  title: title,
};

export default async function ProductGroupEdit({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <ProductGrAddEdit id={id} mode='edit' title={title} />;
}
