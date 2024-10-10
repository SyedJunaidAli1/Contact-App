import { createPortal } from "react-dom"
import { AiOutlineClose } from "react-icons/ai"

const Modal = ({ onClose, isOpen, children }) => {
    return createPortal(
        <>
            {isOpen && (
                <div className=" grid place-items-center backdrop-blur h-screen w-screen fixed top-0 z-40" >

                    <div className=" min-h-[200px] min-w-[368px] mx-auto p-4 bg-white z-50 relative">
                        <div className="flex justify-end">
                            <AiOutlineClose onClick={onClose} className=" text-2xl cursor-pointer" />
                        </div>
                        {children}
                    </div>

                </div>
            )}
        </>
        , document.querySelector("#modal-root"))
}

export default Modal
