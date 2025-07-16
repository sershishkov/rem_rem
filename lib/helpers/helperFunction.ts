import { monthsWorkBudjet } from '@/constants/constants';
import { I_Client, I_ClientType } from '@/interfaces/refdata';

const genNumberByDate = (enteredDate: Date) => {
  const fullYear = enteredDate.getFullYear();
  const month =
    enteredDate.getMonth() < 10
      ? `0${enteredDate.getMonth() + 1}`
      : enteredDate.getMonth() + 1;
  const day =
    enteredDate.getDate() < 10
      ? `0${enteredDate.getDate()}`
      : enteredDate.getDate();
  const hours =
    enteredDate.getHours() < 10
      ? `0${enteredDate.getHours()}`
      : enteredDate.getHours();
  const minutes =
    enteredDate.getMinutes() < 10
      ? `0${enteredDate.getMinutes()}`
      : enteredDate.getMinutes();

  const doc__Number = `${fullYear - 2000}.${month}.${day}.${hours}.${minutes}`;

  return doc__Number;
};

export const generateDocNumber = (): string => {
  const newDate = new Date();
  const doc__Number = genNumberByDate(newDate);

  return doc__Number;
};

export const generateMultipleDocNumbers = () => {
  const oneMinute = 60 * 1000;
  const ms = +new Date();

  const invoiceBaseDate = new Date(ms + oneMinute);
  const invoiceNaklDate = new Date(ms + oneMinute * 2);
  const invoiceAktDate = new Date(ms + oneMinute * 3);
  const aktDate = new Date(ms + oneMinute * 4);
  const naklDate = new Date(ms + oneMinute * 5);
  const koshtorisDate = new Date(ms + oneMinute * 6);
  const contrProectAvtorskDate = new Date(ms + oneMinute * 7);
  const aktProectAvtorskDate = new Date(ms + oneMinute * 8);

  const jurnalAvtoskiyDate = new Date(ms + oneMinute * 9);
  const jurnalRabotDate = new Date(ms + oneMinute * 10);
  const prikazGipDate = new Date(ms + oneMinute * 11);
  const prikazEngineerDate = new Date(ms + oneMinute * 12);
  const prikazOhranaTrudaDate = new Date(ms + oneMinute * 13);

  const invoiceNumberBase = genNumberByDate(invoiceBaseDate);
  const invoiceNumberNakl = genNumberByDate(invoiceNaklDate);
  const invoiceNumberAkt = genNumberByDate(invoiceAktDate);
  const aktNumber = genNumberByDate(aktDate);
  const naklNumber = genNumberByDate(naklDate);
  const koshtorisNumber = genNumberByDate(koshtorisDate);
  const contrProectAvtorskNumber = genNumberByDate(contrProectAvtorskDate);
  const aktProectAvtorskNumber = genNumberByDate(aktProectAvtorskDate);

  const jurnalAvtoskiyNumber = genNumberByDate(jurnalAvtoskiyDate);
  const jurnalRabotNumber = genNumberByDate(jurnalRabotDate);
  const prikazGipNumber = genNumberByDate(prikazGipDate);
  const prikazEngineeNumber = genNumberByDate(prikazEngineerDate);
  const prikazOhranaTrudaNumber = genNumberByDate(prikazOhranaTrudaDate);

  return {
    invoiceNumberBase,
    invoiceNumberNakl,
    invoiceNumberAkt,

    aktNumber,
    naklNumber,
    koshtorisNumber,

    contrProectAvtorskNumber,
    aktProectAvtorskNumber,

    jurnalAvtoskiyNumber,
    jurnalRabotNumber,
    prikazGipNumber,
    prikazEngineeNumber,
    prikazOhranaTrudaNumber,
  };
};

export const setDefaultMonths = () => {
  const newDate = new Date();
  const currentDate = newDate.getDate();
  const currentMonth = newDate.getMonth();

  let startMonth = '';
  let endMonth = '';

  if ((currentMonth === 10 && currentDate > 20) || currentMonth === 11) {
    startMonth = monthsWorkBudjet[11]._id;
    endMonth = monthsWorkBudjet[11]._id;
  } else if (currentDate > 20) {
    startMonth = monthsWorkBudjet[currentMonth + 1]._id;
    endMonth = monthsWorkBudjet[currentMonth + 2]._id;
  } else {
    startMonth = monthsWorkBudjet[currentMonth]._id;
    endMonth = monthsWorkBudjet[currentMonth + 1]._id;
  }
  return {
    startMonth,
    endMonth,
  };
};

export const separateFirms = (
  all__ClientTypes: I_ClientType[],
  allFirms: I_Client[]
) => {
  const arr__ourFirms: I_Client[] = [];
  const arr__Clients: I_Client[] = [];

  const ourFirmObj = all__ClientTypes.find(
    (item: I_ClientType) => item.clientTypeName === 'наша фирма'
  );

  allFirms.forEach((item: I_Client) => {
    const hasOurFirm = item.clientType?.some(
      (oneType) => oneType._id === ourFirmObj?._id
    );

    if (hasOurFirm) {
      arr__ourFirms.push(item);
    } else {
      arr__Clients.push(item);
    }
  });
  return {
    arr__ourFirms,
    arr__Clients,
  };
};
