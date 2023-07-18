"use client";

import React, { useEffect, useState } from "react";

interface TableDataItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
  };
}

interface SortbyList {
  id: boolean;
  price: boolean;
  rate: boolean;
}

const table = () => {
  const [tableData, setTableData] = useState<TableDataItem[]>([]);
  const [searchedTerm, setSearchedTerm] = useState<string>("");
  const [sortbyList, setSortbyList] = useState<SortbyList>({
    id: true,
    price: false,
    rate: false,
  });

  const getData = async () => {
    const res = await fetch(`https://fakestoreapi.com/products`);
    const data = await res.json();
    console.log(data);
    setTableData(data);
  };

  const compare = (a: TableDataItem, b: TableDataItem) => {
    let numA: number = 0;
    let numB: number = 0;

    if (sortbyList.id === true) {
      numA = a.id;
      numB = b.id;
    } else if (sortbyList.price === true) {
      numA = a.price;
      numB = b.price;
    } else if (sortbyList.rate === true) {
      numA = a.rating.rate;
      numB = b.rating.rate;
    }

    if (numA < numB) {
      return -1;
    } else if (numA > numB) {
      return 1;
    } else {
      return 0;
    }
  };

  const filteredData =
    searchedTerm === ""
      ? tableData
      : tableData?.filter(
          (item) =>
            item.category.toLowerCase().includes(searchedTerm.toLowerCase()) ||
            item.title.toLowerCase().includes(searchedTerm.toLowerCase())
        );

  if (sortbyList.id === true) {
    filteredData?.sort(compare);
  }

  if (sortbyList.price === true) {
    filteredData?.sort(compare);
  }

  if (sortbyList.rate === true) {
    filteredData?.sort(compare);
  }

  useEffect(() => {
    getData();
  }, []);

  if (!tableData.length) {
    return <p className="text-lg font-semibold text-slate-600 ">Loading...</p>;
  }

  return (
    <div className="w-full flex items-start justify-start flex-col  gap-2 overflow-x-auto ">
      <div className="w-full flex items-center justify-start gap-2 flex-col md:flex-row ">
        <input
          value={searchedTerm}
          onChange={(e) => setSearchedTerm(e.target.value)}
          type="text"
          placeholder="Search table..."
          className=" border-2 max-w-xs border-slate-500 rounded px-4 py-2 text-base outline-none text-gray-600 "
        />
      </div>

      <table className="w-full border-collapse overflow-x-auto ">
        <thead>
          <tr>
            <th
              onClick={() => {
                setSortbyList({
                  id: true,
                  price: false,
                  rate: false,
                });
              }}
              className={`capitalize cursor-pointer text-left p-2 border-slate-400 border text-base font-bold text-gray-700 ${
                sortbyList.id === true && "bg-green-200"
              } `}
            >
              Id
            </th>
            <th
              className={`capitalize text-left p-2 border-slate-400 border text-base font-bold text-gray-700 `}
            >
              Title
            </th>
            <th
              onClick={() => {
                setSortbyList({
                  id: false,
                  price: true,
                  rate: false,
                });
              }}
              className={`capitalize cursor-pointer text-left p-2 border-slate-400 border text-base font-bold text-gray-700  ${
                sortbyList.price === true && "bg-green-200"
              } `}
            >
              Price
            </th>
            <th
              className={`capitalize text-left p-2 border-slate-400 border text-base font-bold text-gray-700 `}
            >
              Category
            </th>
            <th
              onClick={() => {
                setSortbyList({
                  id: false,
                  price: false,
                  rate: true,
                });
              }}
              className={`capitalize cursor-pointer text-left p-2 border-slate-400 border text-base font-bold text-gray-700  ${
                sortbyList.rate === true && "bg-green-200"
              }  `}
            >
              Rating
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((item) => (
            <tr
              key={item.id}
              className="capitalize text-left p-2 border-slate-400 border even:bg-gray-200"
            >
              <td className="capitalize text-left p-2 border-slate-400 border text-base text-gray-600 ">
                {" "}
                {item.id}{" "}
              </td>
              <td className="capitalize text-left p-2 border-slate-400 border text-base text-gray-600">
                {" "}
                {item.title}{" "}
              </td>
              <td className="capitalize text-left p-2 border-slate-400 border text-base text-gray-600">
                {" "}
                ${item.price}{" "}
              </td>
              <td className="capitalize text-left p-2 border-slate-400 border text-base text-gray-600">
                {" "}
                {item.category}{" "}
              </td>
              <td className="capitalize text-left p-2 border-slate-400 border text-base text-gray-600">
                {" "}
                {item.rating.rate}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default table;
