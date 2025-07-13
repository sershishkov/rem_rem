import { toast } from 'react-toastify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorToMessage = (newError: any) => {
  const message =
    newError?.response?.data?.message ||
    newError.message ||
    newError.toString();
  return message;
};

export const item__add = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataObject: any,
  currentURL: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  route: any
) => {
  try {
    const res = await fetch(`/api${currentURL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObject),
      cache: 'no-store',
    });
    const myData = await res.json();

    if (!res.ok || !myData.my_data) {
      throw new Error(myData.message);
    }

    toast.success(`${myData.message}`);

    setTimeout(() => {
      route.back();
    }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = errorToMessage(error);
    toast.error(`${message}`);
  }
};

export const item__edit = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataObject: any,
  currentURL: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  route: any
) => {
  const { _id } = dataObject;
  delete dataObject._id;

  try {
    const res = await fetch(`/api${currentURL}/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObject),
      cache: 'no-store',
    });
    const myData = await res.json();

    if (!res.ok || !myData.my_data) {
      throw new Error(myData.message);
    }

    toast.success(`${myData.message}`);

    setTimeout(() => {
      route.back();
    }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = errorToMessage(error);
    toast.error(`${message}`);
  }
};

export const get__all = async (
  // dataObject: MyRequestParams,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataObject: any,
  currentURL: string
) => {
  try {
    let queryString = '';
    const sizeObject = Object.keys(dataObject).length;
    if (sizeObject > 0) {
      queryString = '/?';
    }

    for (const field in dataObject) {
      queryString += `${field}=${dataObject[field]}&`;
    }

    const res = await fetch(`/api${currentURL}${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const myData = await res.json();
    if (!res.ok || !myData.my_data) {
      throw new Error(myData.message);
    }
    return myData.my_data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = errorToMessage(error);
    toast.error(`${message}`);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const item__get_one = async (dataObject: any, currentURL: string) => {
  const { _id } = dataObject;
  try {
    const res = await fetch(`/api${currentURL}/${_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

      cache: 'no-store',
    });
    const myData = await res.json();
    if (!res.ok) {
      throw new Error(myData.message);
    }

    return myData.my_data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = errorToMessage(error);
    toast.error(`${message}`);
  }
};

export const delete__one = async (_id: string, currentURL: string) => {
  try {
    const res = await fetch(`/api${currentURL}/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const myData = await res.json();
    if (!res.ok) {
      throw new Error(myData.message);
    } else {
      toast.success(myData.message);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = errorToMessage(error);
    toast.error(`${message}`);
  }
};
