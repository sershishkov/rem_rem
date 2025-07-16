import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import ProductsAddEdit from '../ProductsAddEdit';

const title = 'Редактировать Товар';

export const metadata: Metadata = {
  title: title,
};

export default async function ProductsEdit({ params }: Readonly<ParamsProps>) {
  const { id } = await params;
  return <ProductsAddEdit id={id} mode='edit' title={title} />;
}
