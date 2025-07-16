import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import ServWorkAddEdit from '../ServWorkAddEdit';

const title = 'Редактировать Услугу (работу)';

export const metadata: Metadata = {
  title: title,
};

export default async function ServiceWorksEdit({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <ServWorkAddEdit id={id} mode='edit' title={title} />;
}
