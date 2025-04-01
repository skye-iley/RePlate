import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

// placeholder TODO: current location will be in a context

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
// TanStack Table Setup
const columnHelper = createColumnHelper<NearbyDonations>();

const columns = [
    columnHelper.accessor("name", {
        header: "Donator",
        cell: (props) => <p>{props.getValue()}</p>
    }),
    columnHelper.accessor("lastRestocked", {
        header: "Last Restocked",
    }),
    columnHelper.accessor("address.city", {
        header: "City",
    }),
    columnHelper.accessor((row) => `${row.name}`, {
        header: "Distance",
    }),
];

const NearbyDonationsList = () => {
// placeholder TODO: get current location from context
  const table = useReactTable({
    data: placesList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return(
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
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