import Image from 'next/image';
import Table from "../components/table"

export default function Home() {

  return (
    <main className="flex w-full min-h-screen items-center justify-center py-20 px-2 lg:px-24 ">
      {/* <h1>Hello world!!</h1> */}
      <Table/>
    </main>
  )
}
