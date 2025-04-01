import { ColumnHelper, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

//current location will be in a context

interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string; // Optional for flexibility
}
interface NearbyDonations {
    id?: string,
    name: string,
    lastRestocked: string,
    address: Address,
    donatorType: string,
}

// placeholder. We will need to actually form this from the data
const placesList: NearbyDonations[] = [{
    name: "Freddy Fazbear's Pizza",
    lastRestocked: "recent",
    address:{
        street: "87 Freddy St.",
        city: "Hurricane",
        state: "Utah",
        zipCode: "84737"
    },
        donatorType: "restaurant"
},
{   
    name: "lol two",
    lastRestocked: "recent",
    address:{
        street: "24 Funny St.",
        city: "Bikini Bottom",
        state: "Hawaii",
        zipCode: "02425"
    },
        donatorType: "food bank"
},
{   
    name: "Emily Residence",
    lastRestocked: "recent",
    address:{
        street: "1 Oid st.",
        city: "Amherst",
        state: "MA",
        zipCode: "01003"
    },
        donatorType: "independent"
}
]

//tanstack functions
const columnHelper = createColumnHelper<NearbyDonations>()

const columns = [
    columnHelper.accessor('name', {
    header: 'Donator',
    cell: props => props.getValue().toUpperCase(),
    }),
    columnHelper.accessor('lastRestocked', {
    header: 'Last Restocked',
    }),
    columnHelper.accessor('address.city', {
    header: 'City',
    }),
    columnHelper.accessor(row => `${row.name}`, {
    header: 'Distance',
    }),
]
const table = useReactTable({data: placesList, columns, getCoreRowModel: getCoreRowModel()})
const NearbyDonationsList = () => {
// get current location
    return(
        <div className="p-4 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-2 border border-gray-300 text-left">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border border-gray-300">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )

}
export default NearbyDonationsList