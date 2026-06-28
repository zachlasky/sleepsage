import { useState, useRef } from 'react';

import {
  Table as FlowbiteTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow
} from 'flowbite-react';

const customTableTheme = {
  root: {
    base: 'w-full text-left text-sm text-gray-400',
    shadow: 'absolute left-0 top-0 -z-10 h-full w-full rounded-lg  drop-shadow-md bg-black',
    wrapper: 'relative'
  },
  body: {
    base: 'group/body',
    cell: {
      base: 'px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg'
    }
  },
  head: {
    base: 'group/head text-xs uppercase text-gray-400',
    cell: {
      base: 'px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-700'
    }
  },
  row: {
    base: 'group/row',
    hovered: '',
    striped: 'odd:bg-gray-800 even:bg-gray-700'
  }
};

type TTableBodyData = {
  interactions: string[];
  risks: string[];
  symptoms: string[];
  email: string;
};

type TUserTableProps = {
  data: TTableBodyData;
};

const UserTable = ({ data }: TUserTableProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [atBottom, setAtBottom] = useState(false);

  // Detect when user scrolls to the bottom
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setAtBottom(scrollTop + clientHeight >= scrollHeight - 5);
    }
  };

  return (
    <div className="relative h-[350px] md:h-[600px] rounded-lg">
      {/* Scrollable Table */}
      <div className="h-full overflow-auto" onScroll={handleScroll} ref={scrollRef}>
        <FlowbiteTable className="w-full h-full" theme={customTableTheme}>
          <TableHead>
            <TableHeadCell className="md:table-cell">Email</TableHeadCell>
            <TableHeadCell className="table-cell">Interactions</TableHeadCell>
            <TableHeadCell className="table-cell">Risks</TableHeadCell>
            <TableHeadCell className="table-cell">Symptoms</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            <TableRow className="border-gray-700 bg-gray-800">
              <TableCell className="table-cell whitespace-nowrap font-medium text-white">
                {data.email}
              </TableCell>
              <TableCell className="table-cell whitespace-nowrap font-medium text-white">
                {data.interactions.map((interaction, i) => (
                  <ul key={interaction + i}>
                    <li>{interaction}</li>
                  </ul>
                ))}
              </TableCell>
              <TableCell className="table-cell whitespace-nowrap font-medium text-white">
                {data.symptoms.map((symptom, i) => (
                  <ul key={symptom + i}>
                    <li>{symptom}</li>
                  </ul>
                ))}
              </TableCell>
              <TableCell className="table-cell whitespace-nowrap font-medium text-white">
                {data.risks.map((risk, i) => (
                  <ul key={risk + i}>
                    <li>{risk}</li>
                  </ul>
                ))}
              </TableCell>
              <TableCell className="table-cell">
                <a href="#" className="font-medium hover:underline text-cyan-500">
                  Edit
                </a>
              </TableCell>
            </TableRow>
          </TableBody>
        </FlowbiteTable>
      </div>
    </div>
  );
};

export { UserTable };
