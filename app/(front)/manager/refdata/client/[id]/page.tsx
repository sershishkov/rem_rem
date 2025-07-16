import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import ClientAddEdit from '../ClientAddEdit';

const title = 'Редактировать Клиента';

export const metadata: Metadata = {
  title: title,
};

export default async function ClientEdit({ params }: Readonly<ParamsProps>) {
  const { id } = await params;
  return <ClientAddEdit id={id} mode='edit' title={title} />;
}
