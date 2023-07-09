import React, { useEffect, useState } from "react";
import { createClient } from "@layerzerolabs/scan-client";

interface Transaction {
  to: string;
  from: string;
  tx: string;
  status?: string;
  time?: any;
}

const Transactions = (props: any) => {
  const client = createClient("mainnet");
  const [txLoaded, setTxLoaded] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  function getTxData(tx: string) {
    return client.getMessagesBySrcTxHash(tx).then((result) => {
      return result;
    });
  }
  async function getStatusForAllTransactions() {
    const storedTransactions = localStorage.getItem("transactions");
    // console.log(storedTransactions);
    let transactions: Transaction[] = [];
    if (storedTransactions !== null) {
      transactions = JSON.parse(storedTransactions);
    }
    const promises = transactions.map((transaction) => {
      return getTxData(transaction.tx);
    });

    const rawResults = await Promise.all(promises);
    const results = rawResults.filter((res) => res.messages.length > 0);
    // console.log(results);
    const newTxs = transactions.map((transaction) => {
      transaction.status =
        results.filter((res) => res.messages[0].srcTxHash === transaction.tx)[0]
          ?.messages[0].status || "PROCESSING";
      return transaction;
    });
    return newTxs;
  }

  useEffect(() => {
    getStatusForAllTransactions().then((res) => {
      setTransactions(res);
    });
  }, []);
  function handleButtonClick() {
    props.setShowModal(false);
    // console.log(props);
  }

  return (
    <>
      <div className="justify-center  items-center dark:bg-[#1e293b82] flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl z-11 ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative  flex flex-col w-full dark:bg-[#1e293b] bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Past Transactions</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => handleButtonClick()}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex flex-auto">
              <div className="h-96 overflow-y-scroll">
                {transactions
                  .slice()
                  .reverse()
                  .map((transaction) => (
                    <div
                      key={transaction.tx}
                      className="bg-[#f0f8ff] dark:bg-black p-4 m-3"
                    >
                      <div className="grid grid-cols-3 gap-3 justify-item-start">
                        <div className="justify-start">
                          <span>{transaction.from}</span>{" "}
                        </div>
                        <div className="relative w-[6.5rem]  flex -ml-[31px]">
                          <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="coredao-bridge-11xpnbx h-[1.5rem] -rotate-90"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.5 11.7909L4.35554 8.64648L3.64844 9.35359L8.00199 13.7071L12.3555 9.35359L11.6484 8.64648L8.5 11.7949L8.5 2L7.5 2L7.5 11.7909Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                        <div className="-ml-[65px]">
                          <span>{transaction.to}</span>
                        </div>
                        <div className="text-sm text-[#008000]">
                          {transaction.time ? transaction.time : "TIME ERROR"}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 justify-between">
                        <div className="col-start-1 col-end-3">
                          <a
                            href={`https://layerzeroscan.com/tx/${transaction.tx}`}
                            target="_blank"
                          >
                            LayerZero Scan
                          </a>
                        </div>
                        <div
                          className={`col-end-7 col-span-2
                          ${
                            transaction.status == "PROCESSING"
                              ? "text-[#4aa7e1]"
                              : ""
                          } ${
                            transaction.status == "FAILED"
                              ? "text-[#ff0000]"
                              : ""
                          } ${
                            transaction.status == "DELIVERED"
                              ? "text-[#02ad02]"
                              : ""
                          } ${
                            transaction.status == "INFLIGHT"
                              ? "text-[#5935a7]"
                              : ""
                          }`}
                        >
                          {transaction.status || ""}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <p className="my-4 text-slate-500 text-lg leading-relaxed"></p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 rounded-b">
              <button
                className="text-white bg-[#02ad02] font-bold uppercase px-6 py-2 text-sm outline-[#02ad02] focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleButtonClick()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Transactions;
