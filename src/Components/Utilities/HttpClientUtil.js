import axios from 'axios';
import { log } from './LoggingUtils';

export const getHeader = () => {

    let headers = {
        'Content-Type': 'application/json'
    };

    return headers;
};

export const getUrlEncodedHeader = () => {
    return {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
};

export const getJsonHeader = () => {
    return {
        'Content-Type': 'application/json',
    }
};

export const getFormDataHeader = () => {
    return {
        'Content-Type': 'multipart/form-data',
    }
};



// export const get = async (endpoint, requestHeaders) => {
//     try {
//         const response = await axios.get(`${endpoint}`, {
//             withCredentials: false, // was initially true, find out why the cookie stuff is not working
//             headers: requestHeaders
//         });
//         log(endpoint, response.data);

//         return response.data;
//     } catch (error) {
//         if (error.response && error.response.data) {
//             return error.response.data;
//         }

//         const errorObject = handleError(error.message);
//         log(`ERROR: ${endpoint}`, errorObject);

//         return errorObject;
//     }
// };

export const post = async (endpoint, requestBody, requestHeaders) => {
    try {
        const response = await axios.post(`${endpoint}`, requestBody, {
            headers: requestHeaders
        });
        log(endpoint, response.data);

        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }

        const errorObject = handleError(error.message);
        log(`ERROR: ${endpoint}`, errorObject);

        return errorObject;
    }
};

// export const postFormData = async (endpoint, requestBody = {}) => {
//     try {
//         const response = await axios.post(endpoint, requestBody, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//         });

//         log(endpoint, response.data);
//         return response.data;
//     } catch (error) {
//         if (error.response && error.response.data) {
//             log(`ERROR: ${endpoint}`, error.response.data);
//             return error.response.data;
//         }

//         const errorObject = handleError(error.message);
//         log(`ERROR: ${endpoint}`, errorObject);
//         return errorObject;
//     }
// };


export const get = async (endpoint, requestHeaders) => {
    try {
        const response = await axios.get(`${endpoint}`, {
            headers: requestHeaders
        });
        log(endpoint, response.data);

        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }

        const errorObject = handleError(error.message);
        log(`ERROR: ${endpoint}`, errorObject);

        return errorObject;
    }
};

export const delete_ = async (endpoint, requestHeaders) => {
    try {
        const response = await axios.delete(`${endpoint}`, {
            headers: requestHeaders
        });
        log(endpoint, response.data);

        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }

        const errorObject = handleError(error.message);
        log(`ERROR: ${endpoint}`, errorObject);

        return errorObject;
    }
};

export const postUrlEncoded = async (endpoint, requestBody, requestHeaders) => {
    try {
        const encodedBody = new URLSearchParams(requestBody).toString();
        const response = await axios.post(endpoint, encodedBody, {
            headers: requestHeaders
        });
        log(endpoint, response.data);

        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }

        const errorObject = handleError(error.message);
        log(`ERROR: ${endpoint}`, errorObject);

        return errorObject;
    }
};

export const getUrlEncoded = async (endpoint, requestHeaders) => {
    try {
        const response = await axios.get(endpoint, {
            headers: requestHeaders
        });
        log(endpoint, response.data);

        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }

        const errorObject = handleError(error.message);
        log(`ERROR: ${endpoint}`, errorObject);

        return errorObject;
    }
};

export const handleError = (error) => ({
    data: null,
    message: error,
    status: '99'
});

