import { Folder2Open } from "react-bootstrap-icons"
import "./EmptyFolder.css";

const EmptyFolder = ({ shouldDisplay }) => {
    return (
        shouldDisplay &&
        <div className="flex justify-center items-center w-[100%]">
            <div>
                <Folder2Open className="empty-folder empty-vh" />
            </div>
        </div>
    )
}

export default EmptyFolder;