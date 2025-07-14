import { NextRequest, NextResponse } from 'next/server';
import Model__User from '@/lib/mongoose/models/Model__User';

import { connectToDB } from '@/lib/mongoose/connectToDB';

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') ?? '0');
  const pageSize = parseInt(url.searchParams.get('limit') ?? '0');

  const skip = (page - 1) * pageSize;
  let filterObject = {};

  filterObject = {
    role: {
      $in: ['worker', 'manager', 'accountant', 'boss'],
    },
  };
  try {
    await connectToDB();

    const total: number = await Model__User.countDocuments(filterObject);
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    const all__ITEMS = await Model__User.find(filterObject)
      .limit(pageSize)
      .skip(skip)
      .sort({
        email: 1,
      });

    if (!all__ITEMS) {
      return new NextResponse(
        JSON.stringify({
          message: 'На данный момент ничего в базе нет',
        }),

        {
          status: 400,
        }
      );
    }

    const responseObj = {
      message: 'Найдено успешно',
      my_data: {
        items: all__ITEMS,
        total,
        totalPages,
      },
    };
    return new NextResponse(JSON.stringify(responseObj), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};
