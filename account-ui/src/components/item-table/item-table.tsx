import Image from 'next/image';
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
    hovered: 'hover:bg-gray-600',
    striped: 'odd:bg-gray-800 even:bg-gray-700'
  }
};

type TTableBodyData = {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
  rating: string;
};

type TItemTableProps = {
  data: TTableBodyData[];
  hasRemove?: boolean;
};

const ItemTable = ({ data, hasRemove }: TItemTableProps) => {
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
        <FlowbiteTable className="w-full h-full" hoverable theme={customTableTheme}>
          <TableHead>
            <TableHeadCell className='hidden md:table-cell'>
              <span className="sr-only">Image</span>
            </TableHeadCell>
            <TableHeadCell className="table-cell">Name</TableHeadCell>
            <TableHeadCell className="table-cell">Description</TableHeadCell>
            <TableHeadCell className="hidden md:table-cell">Price</TableHeadCell>
            <TableHeadCell className="hidden md:table-cell">Rating</TableHeadCell>
            {hasRemove && (
              <TableHeadCell className="table-cell">
                <span className="sr-only">Remove</span>
              </TableHeadCell>
            )}
          </TableHead>
          <TableBody className="divide-y">
            {data.length > 0 ? (
              data.map((data) => (
                <TableRow key={data.id} className="border-gray-700 bg-gray-800 cursor-pointer">
                  <TableCell className="hidden md:table-cell whitespace-nowrap font-medium text-white">
                    <Image
                      src={data.image}
                      alt={data.name}
                      width={100}
                      height={100}
                      className="rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="table-cell whitespace-nowrap font-medium text-white">
                    {data.name}
                  </TableCell>
                  <TableCell className="table-cell">{data.description}</TableCell>
                  <TableCell className="hidden md:table-cell">{data.price}</TableCell>
                  <TableCell className="hidden md:table-cell">{data.rating}</TableCell>
                  {hasRemove && (
                    <TableCell className="table-cell">
                      <a href="#" className="font-medium hover:underline text-cyan-500">
                        Remove
                      </a>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-20 text-gray-400">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </FlowbiteTable>
      </div>

      {/* Fixed Down Arrow */}
      {data.length > 4 && !atBottom && (
        <div className="absolute bottom-6 md:bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce text-white z-10 pointer-events-none">
          ↓
        </div>
      )}
    </div>
  );
};

export { ItemTable };
