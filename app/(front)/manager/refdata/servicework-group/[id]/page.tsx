import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import ServWorkGrAddEdit from '../ServWorkGrAddEdit';

const title = 'Редактировать Группу работ';

export const metadata: Metadata = {
  title: title,
};

export default async function ServiceWorkGroupEdit({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <ServWorkGrAddEdit id={id} mode='edit' title={title} />;
}
