import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import ProductTypeAddEdit from '../ProductTypeAddEdit';

const title = 'Редактировать Тип товара';

export const metadata: Metadata = {
  title: title,
};

export default async function ProductTypeEdit({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <ProductTypeAddEdit id={id} mode='edit' title={title} />;
}
