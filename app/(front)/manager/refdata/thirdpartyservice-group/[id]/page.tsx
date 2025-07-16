import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import ThirdServGroupAddEdit from '../ThirdServGroupAddEdit';

const title = 'Редактировать группу сторонних сервисов';

export const metadata: Metadata = {
  title: title,
};

export default async function ThirdPartyServiceGroupEdit({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <ThirdServGroupAddEdit id={id} mode='edit' title={title} />;
}
