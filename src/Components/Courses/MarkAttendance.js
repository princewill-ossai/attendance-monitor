import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { Camera } from 'lucide-react'
import { attendanceUrl } from '../Utilities/Endpoints';
import ConfirmationModal from '../Modal/ConfirmationModal';
import { useLocation } from 'react-router-dom';

const MarkAttendance = () => {
  const webcamRef = useRef(null);
  const [images, setImages] = useState([])

  const [confirmationDialog, setConfirmationDialog] = useState({
    showDialog: false,
    processing: false,
    successful: false,
    parent: false,
    error: false,
    request: null,
    endpoint: `${attendanceUrl}`,
    method: "POST_FORM_DATA",
    landingPage: "/"
  });

  const location = useLocation();
  const { session } = location.state || {}

  const base64ToFile = (base64, filename) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      setImages((prev) => [...prev, imageSrc]);
    }
  };

  const uploadAll = () => {
    if (images.length === 0) {
      alert("Kindly take a snapshot");
      return;
    }

    const request = new FormData();

    images.forEach((img, index) => {
      const file = base64ToFile(img, `student_${index + 1}.jpg`)

      request.append("sessionId", session.id)
      request.append("facialImages", file)
    })

    setConfirmationDialog(prev => ({
      ...prev,
      showDialog: true,
      parent: true,
      request: request
    }));
  }

  return (
    <div className="bg-[#0A0A1A] flex flex-col items-center justify-center min-h-screen px-4 py-6">
      <div className="bg-[#111132] rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg text-center border border-gray-700 space-y-6">
        <div className="flex items-center justify-center gap-2">
          <Camera className="text-indigo-400 w-6 h-6 sm:w-7 sm:h-7" />
          <h1 className="text-xl sm:text-2xl font-semibold text-white capitalize">
            Mark Attendance
          </h1>
        </div>

        <div className="relative">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            className="rounded-xl shadow-lg border border-gray-700 w-full aspect-video object-cover"
            videoConstraints={{
              facingMode: 'user',
              width: { ideal: 640 },
              height: { ideal: 480 },
            }}
          />

          <div className="absolute inset-0 rounded-xl ring-2 ring-indigo-500/20 hover:ring-indigo-400/40 transition-all duration-300"></div>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed">
          Please ensure your face is clearly visible and the camera is well lit.
        </p>

        <button onClick={capture} className="bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all duration-300 text-white font-medium py-2.5 px-6 rounded-lg shadow-md w-full sm:w-auto">
          Capture
        </button>

        <button onClick={uploadAll} className="bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all duration-300 text-white font-medium py-2.5 px-6 mx-2 rounded-lg shadow-md w-full sm:w-auto">
          Upload All
        </button>

        <div className="grid grid-cols-4 gap-2 mt-4">
          {images.map((src, i) => (
            <img key={i} src={src} alt={`capture-${i}`} className="w-32 h-24 object-cover rounded shadow" />
          ))}
        </div>
      </div>

      <ConfirmationModal
        data={confirmationDialog}
        dataStateFunction={setConfirmationDialog}
      />
    </div>
  )
}

export default MarkAttendance

/* 
the custom code for posting formData
const [confirmationDialog, setConfirmationDialog] = useState({
  showDialog: false,
  processing: false,
  successful: false,
  parent: false,
  error: false,
  request: null,
  endpoint: `${attendanceUrl}`,
  method: "POST_FORM_DATA",
  landingPage: "/"
});

THIS FUNCTION CONVERTS THE IMAGE TAKEN IN BASE64 FORMAT TO FILE SO WE CAN SEND TO BACKEND USING FORMDATA
const base64ToFile = (base64, filename) => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

THIS FUNCTION GETS A SCREENSHOT FROM THE WEBCAM
const capture = () => {
  const imageSrc = webcamRef.current.getScreenshot();

  if (imageSrc) {
    setImages((prev) => [...prev, imageSrc]);
  }
};

This code loops through all images, converts each from base64 to a File, and appends both the session ID and the image file to a FormData object, preparing it for upload to the backend.

const request = new FormData();

images.forEach((img, index) => {
  const file = base64ToFile(img, `student_${index + 1}.jpg`)

  request.append("sessionId", session.id)
  request.append("facialImages", file)
})
*/
