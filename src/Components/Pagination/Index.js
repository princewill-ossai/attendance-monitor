import "./Pagination.css";
import ReactPaginate from "react-paginate";
/*
    This componenet should be reusable for all pageable components. Just ensure the below props are passed

    pageRequest: pageRequest object for page and size
    setPageRequestFxn: fxn to set page and size
    fetchItemsFxn: fxn to fetch items on change of page or size
    totalPages: total elements in page
    render: determines the block to display via conditional rendering
*/
const PaginationUtil = ({ pageRequest, setPageRequestFxn, fetchItemsFxn, totalPages, render }) => {
    const handlePageClick = (event) => {
        render({
            loader: true,
            table: false,
            emptyFolder: false
        });
        const selectedPage = event.selected + 1;
        setPageRequestFxn((prev) => ({
            ...prev,
            page: selectedPage
        }))
        fetchItemsFxn(selectedPage, pageRequest.size);
    };

    const handlePageChange = (event) => {
        render({
            loader: true,
            table: false,
            emptyFolder: false
        });
        const pageValue = event.target.value.trim() === "" ? 1 : event.target.value
        event.preventDefault();

        setPageRequestFxn((prev) => ({
            ...prev,
            page: pageValue
        }));

        fetchItemsFxn(pageValue, pageRequest.size);
    }

    const handleSizeChange = (event) => {
        event.preventDefault();
        setPageRequestFxn((prev) => ({
            ...prev,
            size: event.target.value
        }));
        fetchItemsFxn(pageRequest.page, event.target.value);
    }

    return (
        <div className="mt-10 w-full">
            <div className="border-t border-gray-300 mt-10" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4">
                <div className="text-sm text-gray-700">
                    {`Page ${pageRequest.page} of ${totalPages}`}
                </div>
                <div className="flex justify-center">
                    <ReactPaginate
                        previousLabel={'Prev'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={totalPages}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={1}
                        onPageChange={handlePageClick}
                        activeClassName={'bg-blue-500 text-white rounded'}
                        containerClassName={'flex flex-wrap items-center gap-2 text-sm'}
                        pageClassName={'px-3 py-1 border rounded hover:bg-gray-100'}
                        previousClassName={'px-3 py-1 border rounded hover:bg-gray-100'}
                        nextClassName={'px-3 py-1 border rounded hover:bg-gray-100'}
                    />
                </div>
                <div className="flex flex-wrap justify-end gap-3 items-center">
                    <select
                        onChange={handleSizeChange}
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="10">10/page</option>
                        <option value="30">30/page</option>
                        <option value="50">50/page</option>
                        <option value="70">70/page</option>
                        <option value="100">100/page</option>
                        <option value="150">150/page</option>
                        <option value="200">200/page</option>
                        <option value="500">500/page</option>
                    </select>
                    <input
                        onChange={handlePageChange}
                        type="number"
                        min="1"
                        step="1"
                        className="w-24 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter page"
                        name="page"
                    />
                </div>
            </div>
        </div>
    )
}

export default PaginationUtil;