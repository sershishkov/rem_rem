import { NextRequest, NextResponse } from 'next/server';
import Model__ContractTempate from '@/lib/mongoose/models/manager/templates/Model__ContractTempate';

import { connectToDB } from '@/lib/mongoose/connectToDB';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const GET = async (request: NextRequest, { params }: Props) => {
  const { id } = await params;
  try {
    await connectToDB();
    const one__ITEM = await Model__ContractTempate.findById(id);
    if (!one__ITEM) {
      return new NextResponse(
        JSON.stringify({
          message: 'Нет  объекта с данным id',
        }),
        {
          status: 400,
        }
      );
    }
    const responseObj = {
      message: 'Элемент найден успешно',
      my_data: one__ITEM,
    };

    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

export const PUT = async (request: NextRequest, { params }: Props) => {
  const { id } = await params;
  const myData = await request.json();
  if (!myData) {
    return new NextResponse(
      JSON.stringify({
        message: 'Please add some fields',
      }),

      { status: 400 }
    );
  }
  const {
    templateContractName,
    templateContractHeader,
    templateContractDescription,
    contractPreambule,
    contractBody,
  } = myData;

  try {
    await connectToDB();

    const new__ITEM = {
      templateContractName,
      templateContractHeader,
      templateContractDescription,
      contractPreambule,
      contractBody,
    };

    const updated__ITEM = await Model__ContractTempate.findByIdAndUpdate(
      id,
      new__ITEM,
      {
        new: true,
        runValidators: true,
      }
    );

    const responseObj = {
      message: 'Элемент изменен успешно',
      my_data: updated__ITEM,
    };

    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest, { params }: Props) => {
  const { id } = await params;
  try {
    await connectToDB();
    const one__ITEM = await Model__ContractTempate.findByIdAndDelete(id);

    if (!one__ITEM) {
      return new NextResponse(
        JSON.stringify({
          message: 'Нет  объекта с данным id',
        }),
        {
          status: 400,
        }
      );
    }
    const responseObj = {
      message: 'Элемент удалён успешно',
      my_data: {},
    };

    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};
