import "./ConfirmationModal.css";
import clsx from "clsx";
import loader from "../../Assets/Loader.gif";
import success_tick from "../../Assets/good_tick_1.png";
import bad_tick from "../../Assets/bad_tick.png";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getFormDataHeader, getJsonHeader, post } from "../Utilities/HttpClientUtil";
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
        let response;
        if (data.method === 'POST') {
            response = await post(data.endpoint, data.request, getJsonHeader());
            console.log("String", data.endpoint)
        } else if (data.method === 'POST_FORM_DATA') {
            response = await post(data.endpoint, data.request, getFormDataHeader());
            console.log("String", data.endpoint)
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

/*
THIS COMPONENT TAKES IN DATA AND DATASTATEFUNCTION AS PROPS
DATA IS AN OBJECT CONTAINING ALL THE INFORMATION ABOUT THE MODAL. LIKE: ENDPOINT, REQUEST, METHOD ETC
DATASTATEFUNCTION IS THE SETTER FUNCTION TO UPDATE THE DATA STATE IN THE PARENT COMPONENT
const ConfirmationModal = ({ data, dataStateFunction }) => {
    const modalRef = useRef(null); A REFERENCE TO THE MODAL FOR CLICK OUTSIDE DETECTION
    const navigate = useNavigate();

    FUNCTION TO HANDLE THE STATE IF THE USER CLICKS ON CONFIRM BUTTON
    const handleConfirm = async () => {
        dataStateFunction((prev) => ({
            ...prev, THIS MEANS WE KEEP THE PREVIOUS STATE AND ONLY UPDATE THE FOLLOWING FIELDS
            processing: true,
            showDialog: false, HIDES THE DIALOG
            success: false,
            error: false,
            parent: true
        }));
        let response;

        IF METHOD IS POST, WE CALL THE POST FUNCTION WITH JSON HEADER
        if (data.method === 'POST') {
            response = await post(data.endpoint, data.request, getJsonHeader());
            console.log("String", data.endpoint)
        }
            IF METHOD IS POST_FORM_DATA, WE CALL THE POST FUNCTION WITH FORMDATA HEADER

             else if (data.method === 'POST_FORM_DATA') {
            response = await post(data.endpoint, data.request, getFormDataHeader());
            console.log("String", data.endpoint)
        } else {

        }
        if (response && response.code === "00") { IF THE RESPONSE IS SUCCESSFUL
            dataStateFunction((prev) => ({
                ...prev, KEEP PREVIOUS STATE AND UPDATE THE FOLLOWING
                processing: false,
                showDialog: false,
                success: true, SUCCESS FLAG SET TO TRUE
                error: false,
                parent: true
            }));
        } else {
            IF RESPONSE IS NOT SUCCESSFUL
            dataStateFunction((prev) => ({
                ...prev, KEEP PREVIOUS STATE AND UPDATE THE FOLLOWING
                processing: false,
                showDialog: false,
                success: false,
                error: true, SHOW ERROR FLAG
                parent: true
            }));
        }
    };

    FUNCTION TO HANDLE CLOSING THE MODAL WITHOUT NAVIGATING AWAY
    const handleClose = () => {
        IF USERS CLICKS OUTSIDE THE MODAL OR ON THE CLOSE ICON, THIS FUNCTION WILL RESET THE MODAL STATE
        dataStateFunction((prev) => ({
            ...prev,
            processing: false,
            showDialog: false,
            success: false,
            error: false,
            parent: false
        }));
    }

    FUNCTION TO HANDLE CLOSING THE MODAL AND NAVIGATING TO LANDING PAGE
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
        navigate(data.landingPage, { replace: true }); NAVIGATE TO THE LANDING PAGE SPECIFIED IN DATA
    }

    IM THIS USEEFFECT, WE ADD AN EVENT LISTENER TO DETECT CLICKS OUTSIDE THE MODAL TO CLOSE IT
    useEffect(() => {
        if (!data.showDialog) return;

        const handleClickOutside = (event) => {
            if (modalRef.current && event.target === modalRef.current) { IF THE CLICKED TARGET IS THE MODAL BACKDROP
            THEN WE CALL THE HANDLECLOSE FUNCTION TO RESET THE MODAL STATE
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

        WE ADD THE EVENT LISTENER TO THE WINDOW OBJECT
        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [data.showDialog, dataStateFunction]);
 */