'use client';
import React, { useState, useEffect } from 'react';
import { item__get_one, get__all } from '@/lib/actions/refdata.actions';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import JkhTrebPoSmeteAvkToPrint from '@/components/documents/formsToPrint/jkh-proectn-avtorsk/JkhTrebPoSmeteAvkToPrint';
import {
  I_Contract,
  I_Client,
  I_ThirdPartyServiceInAkt,
  I_ServiceWorkInAkt,
  I_WorkRows,
  I_LProduct,
  I_ProductInNakl,
  I_DocumentNakladnaya,
  I_DocumentAktOfWork,
} from '@/interfaces/refdata';

export default function TrebovaniePoSmeteAvkPrint({
  params,
}: Readonly<ParamsProps>) {
  const { id } = React.use(params);
  const [tableAktRows, setTableAktRows] = useState<I_WorkRows[]>([]);
  const [tableNaklRows, setTableNaklRows] = useState<I_LProduct[]>([]);
  const [currentExecutor, setCurrentExecutor] = useState<I_Client>();
  const [currentClient, setCurrentClient] = useState<I_Client>();
  const [currentContract, setCurrentContract] = useState<I_Contract>();

  useEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const localContract: I_Contract = await item__get_one(
          { _id: id },
          '/manager/refdata/contract'
        );

        const localExexutor: I_Client = await item__get_one(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          { _id: localContract.ourFirm._id },
          '/manager/refdata/client'
        );

        const localClient: I_Client = await item__get_one(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          { _id: localContract.client._id },
          '/manager/refdata/client'
        );
        const localArrOfRelNakl = await get__all(
          {
            page: '0',
            limit: '0',
            filter: '',
            contract: localContract._id,
          },
          `/manager/documents/nakladnaya`
        );
        const localArrOfRelAkt = await get__all(
          {
            page: '0',
            limit: '0',
            filter: '',
            contract: localContract._id,
          },
          `/manager/documents/akt-of-work`
        );

        const currentNakl: I_DocumentNakladnaya = localArrOfRelNakl?.items[0];
        const currentAkt: I_DocumentAktOfWork = localArrOfRelAkt?.items[0];
        setCurrentExecutor(localExexutor);
        setCurrentClient(localClient);
        setCurrentContract(localContract);

        const arrToSetRowsThird = currentAkt?.thirdPartyServices?.map(
          (inner_item: I_ThirdPartyServiceInAkt) => {
            return {
              row_id: inner_item._id!.toString(),
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              workName:
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                inner_item.thirdPartyService.thirdPartyServiceName!,
              extraInformation: inner_item.extraInformation!,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              unit: inner_item?.thirdPartyService?.unit!.unitName,
              amount: inner_item?.amount!.toString(),
              price: inner_item?.price!.toFixed(2),
              rowSum: (inner_item.amount! * inner_item.price!).toFixed(2),
            };
          }
        );
        const arrToSetRowsServ = currentAkt?.serviceWorks?.map(
          (inner_item: I_ServiceWorkInAkt) => {
            return {
              row_id: inner_item._id!.toString(),
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              workName:
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                inner_item.serviceWork.serviceWorkName!,
              extraInformation: inner_item.extraInformation!,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              unit: inner_item?.serviceWork?.unit!.unitName,
              amount: inner_item?.amount!.toString(),
              price: inner_item?.price!.toFixed(2),
              rowSum: (inner_item.amount! * inner_item.price!).toFixed(2),
            };
          }
        );
        setTableAktRows([...arrToSetRowsThird, ...arrToSetRowsServ]);

        const arrToSetRows = currentNakl?.products?.map(
          (inner_item: I_ProductInNakl) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore

            return {
              row_id: inner_item._id!.toString(),
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              product: inner_item.product.productName,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              unit: inner_item.product.unit.unitName,
              extraInformation: inner_item.extraInformation!,
              amount: inner_item?.amount.toString(),
              price: inner_item?.price.toFixed(2),
              rowSum: (inner_item?.amount * inner_item?.price).toFixed(2),
            };
          }
        );

        setTableNaklRows(arrToSetRows);
      };

      myGetOne();
    }
  }, [id]);

  return (
    <JkhTrebPoSmeteAvkToPrint
      currentContract={currentContract!}
      currentClient={currentClient!}
      currentExecutor={currentExecutor!}
      tableAktRows={tableAktRows}
      tableNaklRows={tableNaklRows}
    />
  );
}
