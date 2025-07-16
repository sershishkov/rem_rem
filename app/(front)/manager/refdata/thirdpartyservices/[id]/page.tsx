import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import ThirdServAddEdit from '../ThirdServAddEdit';

const title = 'Редактировать Сторонний сервис';

export const metadata: Metadata = {
  title: title,
};

export default async function ThirdPartyServicesEdit({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <ThirdServAddEdit id={id} mode='edit' title={title} />;
}
