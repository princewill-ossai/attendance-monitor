import "./ConfirmationModal.css";
import clsx from "clsx";
import loader from "../../Assets/Loader.gif";
import success_tick from "../../Assets/good_tick_1.png";
import bad_tick from "../../Assets/bad_tick.png";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../Utilities/HttpClientUtil";

/*
    This modal should be reusable
*/

const ConfirmationModal = ({ data, dataStateFunction }) => {
    const modalRef = useRef(null);
    const navigate = useNavigate();

    const handleConfirm = async () => {
        dataStateFunction((prev) => ({
            ...prev,
            processing: true,
            showDialog: false,
            success: false,
            error: false,
            parent: true
        }));

        const headers = {
            'Content-Type': 'application/json'
        };

        let response;

        if (data.method === 'POST') {
            response = await post(data.endpoint, data.request, headers);
        } else if (data.method === 'POST_FORM_DATA') {
            response = await get(data.endpoint, headers);
        } else {

        }

        if (response && response.code === "00") {
            dataStateFunction((prev) => ({
                ...prev,
                processing: false,
                showDialog: false,
                success: true,
                error: false,
                parent: true
            }));
        } else {
            dataStateFunction((prev) => ({
                ...prev,
                processing: false,
                showDialog: false,
                success: false,
                error: true,
                parent: true
            }));
        }
    };

    const handleClose = () => {
        dataStateFunction((prev) => ({
            ...prev,
            processing: false,
            showDialog: false,
            success: false,
            error: false,
            parent: false
        }));
    }

    const handleCloseAll = () => {
        dataStateFunction((prev) => ({
            ...prev,
            processing: false,
            showDialog: false,
            success: false,
            error: false,
            parent: false,
            reload: !prev.reload
        }));
        navigate(data.landingPage, { replace: true });
    }

    useEffect(() => {
        if (!data.showDialog) return;

        const handleClickOutside = (event) => {
            if (modalRef.current && event.target === modalRef.current) {
                dataStateFunction((prev) => ({
                    ...prev,
                    processing: false,
                    showDialog: false,
                    success: false,
                    error: false,
                    parent: false
                }));
            }
        };

        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [data.showDialog, dataStateFunction]);

    return (
        <div ref={modalRef} className={clsx("confirmation-modal", data.parent && "block-display")}>
            <div className="confirmation-modal-content">
                {
                    [
                        data.showDialog &&
                        <div>
                            <h5 className="mb-2 confirmation-modal-header-text text-center">Are you sure?</h5>
                            <div>
                                <div className="flex justify-center gap-4 text-center">
                                    <button type="submit"
                                        onClick={handleConfirm}
                                        className="bg-green-600 px-3 text-white my-4 py-1 rounded">Yes</button>

                                    <button type="button"
                                        onClick={handleClose}
                                        className="bg-[red] px-3 text-white my-4 py-1 rounded">No</button>
                                </div>
                            </div>
                        </div>,

                        data.processing &&
                        <div className="smooth-fade-in">
                            <h5 className="mb-2 confirmation-modal-header-text text-center">Processing...</h5>
                            <span className="flex justify-center align-center">
                                <img src={loader} className="small-loading" alt="loading" />
                            </span>
                        </div>,

                        data.error &&
                        <div className="smooth-fade-in p-2">
                            <div className="close-icon absolute top-0 right-0">
                                <span onClick={handleClose}>&times;</span>
                            </div>
                            <h5 className="mb-2 confirmation-modal-header-text text-center">Operation failed!</h5>
                            <span className="flex justify-center align-center error-info-circle">
                                <img src={bad_tick} className="bad-tick-md" alt="failed" />
                            </span>
                        </div>,

                        data.success &&
                        <div className="smooth-fade-in p-2">
                            <div className="close-icon absolute top-0 right-0">
                                <span onClick={handleCloseAll}>&times;</span>
                            </div>
                            <h5 className="mb-2 confirmation-modal-header-text text-center">Operation successful!</h5>
                            <span className="flex justify-center align-center error-info-circle">
                                <img src={success_tick} className="success-tick-md" alt="success" />
                            </span>
                        </div>
                    ]
                }
            </div>
        </div>
    )
}

export default ConfirmationModal;