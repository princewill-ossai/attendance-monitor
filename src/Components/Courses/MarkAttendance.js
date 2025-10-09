import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { Camera } from 'lucide-react'
import { registerStudentUrl } from '../Utilities/Endpoints';
import ConfirmationModal from '../Modal/ConfirmationModal';

const MarkAttendance = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null)
  const [confirmationDialog, setConfirmationDialog] = useState({
    showDialog: false,
    processing: false,
    successful: false,
    parent: false,
    error: false,
    request: null,
    endpoint: `${registerStudentUrl}`,
    method: "POST_FORM_DATA",
    landingPage: "/dashboard"
  });
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    const request = new FormData();
    request.append("facialImage", imageSrc);
    setConfirmationDialog(prev => ({
      ...prev,
      showDialog: true,
      parent: true,
      request: request
    }));
  }

  return (
    <div className="bg-[#0A0A1A] text-gray-200 flex flex-col items-center justify-center min-h-screen px-4 py-6">
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
          Capture & Submit
        </button>
      </div>

      <ConfirmationModal
        data={confirmationDialog}
        dataStateFunction={setConfirmationDialog}
      />
    </div>
  )
}

export default MarkAttendance
