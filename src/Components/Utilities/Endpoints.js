export const baseUrl = `${process.env.REACT_APP_MONITOR_BACKEND_URL}/api/v1`;

export const coursesUrl = `${baseUrl}/course`
export const registerStudentUrl = `${baseUrl}/user/registration/student`
export const registerLecturerUrl = `${baseUrl}/user/registration/staff`
export const getLecturersList = `${baseUrl}/user/staff/all`
export const registerCourse = `${baseUrl}/course/registration`
export const getCategories = `${baseUrl}/user/categories`
export const getCourseList = `${baseUrl}/course/list`
export const sessionUrl = `${baseUrl}/attendance/session`
export const attendanceUrl = `${baseUrl}/attendance`