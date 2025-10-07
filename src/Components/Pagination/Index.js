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
        <div>
            <div className="pg-border" />
            <div className="flex justify-between items-center py-1">
                <div className="col-md-3">
                    {`Page ${pageRequest.page} of ${totalPages}`}
                </div>
                <div className="col-md-5">
                    <ReactPaginate
                        previousLabel={'Prev'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={totalPages}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageClick}
                        activeClassName={'active'}
                        containerClassName={'pagination d-flex justify-content-center align-items-center'}
                    />
                </div>
                <div className="flex gap-4 col-md-4 justify-content-end px-0 mx-0">
                    <div className="col-md-5">
                        <select
                            onChange={handleSizeChange}
                            className="form-select form-control-select"
                        >
                            <option value="10">10/page</option>
                            <option value="30">30/page</option>
                            <option value="50">50/page</option>
                            <option value="70">70/page</option>
                            <option value="100">100/page</option>
                            <option value="150">150/page</option>
                            <option value="200">200/page</option>
                            <option value="50">500/page</option>
                        </select>
                    </div>
                    <div className="col-md-5">
                        <input
                            onChange={handlePageChange}
                            type="number"
                            min="1"
                            step="1" 
                            className="form-control form-control-style"
                            placeholder="Enter page"
                            name="page"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaginationUtil;