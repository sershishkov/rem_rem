import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import UsersAddEdit from '../UsersAddEdit';

const title = 'Редактировать Пользователя';

export const metadata: Metadata = {
  title: title,
};

export default async function AdminUsersEdit({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <UsersAddEdit id={id} mode='edit' title={title} />;
}
