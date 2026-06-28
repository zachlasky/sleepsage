import { Pagination as FlowbitePagination } from 'flowbite-react';

type TPaginationProps = {
  currentPage: number;
  itemCount: number;
  itemsPerPage?: number;
  updateCurrentPage: (page: number) => void;
};

const Pagination = ({
  currentPage,
  itemCount,
  itemsPerPage = 10,
  updateCurrentPage
}: TPaginationProps) => {
  return (
    <div className="grid justify-items-center overflow-x-auto sm:justify-center my-10">
      <p className="text-sm">
        {itemCount === 0 ? (
          <>0 results</>
        ) : (
          <>
            Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-semibold">
              {currentPage * itemsPerPage < itemCount ? currentPage * itemsPerPage : itemCount}
            </span>{' '}
            of <span className="font-semibold">{itemCount}</span> Supplements
          </>
        )}
      </p>
      {}
      <FlowbitePagination
        currentPage={currentPage}
        totalPages={Math.ceil(itemCount / itemsPerPage)}
        onPageChange={updateCurrentPage}
        showIcons
      />
    </div>
  );
};

export { Pagination };
