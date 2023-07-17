"use client"

import React, { useEffect, useState } from 'react'

interface TableDataItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
  }
}

const table = () => {

  const [tableData, setTableData] = useState<TableDataItem[]>([]);
  const tableHeaderItems = ["id", "title", "price", "category", "rating"]

  const getData = async () => {
    const res = await fetch(`https://fakestoreapi.com/products`);
    const data = await res.json()
    console.log(data)
    setTableData(data);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className='w-full flex items-start justify-start flex-col  gap-2 overflow-x-auto ' >
      <input type='text' placeholder='Search table...' className=' border-2 border-slate-500 rounded px-4 py-2 text-base outline-none text-gray-600 ' />
      <table className='w-full border-collapse overflow-x-auto ' >
        <thead>
        <tr>
          {tableHeaderItems.map((item) => (
            <th key={item} className='capitalize text-left p-2 border-slate-400 border text-base font-bold text-gray-700' >{item} </th>
          ))}
        </tr>
        </thead>
        <tbody>
          {tableData?.map((item) => (
            <tr key={item.id} className='capitalize text-left p-2 border-slate-400 border even:bg-gray-200' >
              <td className='capitalize text-left p-2 border-slate-400 border text-base text-gray-600 ' > {item.id} </td>
              <td className='capitalize text-left p-2 border-slate-400 border text-base text-gray-600'> {item.title} </td>
              <td className='capitalize text-left p-2 border-slate-400 border text-base text-gray-600'> ${item.price} </td>
              <td className='capitalize text-left p-2 border-slate-400 border text-base text-gray-600'> {item.category} </td>
              <td className='capitalize text-left p-2 border-slate-400 border text-base text-gray-600'> {item.rating.rate} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default table