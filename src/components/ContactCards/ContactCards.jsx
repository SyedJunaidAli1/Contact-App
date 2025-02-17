import { deleteDoc, doc } from "firebase/firestore"
import { HiOutlineUserCircle } from "react-icons/hi"
import { IoMdTrash } from "react-icons/io"
import { RiEditCircleLine } from "react-icons/ri"
import { db } from "../../config/firebase"
import AddAndUpdateContact from "../AddandUpdateContact/AddAndUpdateContact"
import useDisclouse from "../../hooks/useDisclouse"
import { toast } from "react-toastify"

const ContactCards = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclouse()

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id))
      toast.success("Contact Deleted Successfully")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div key={contact.id} className=" bg-yellow flex justify-between items-center p-3 rounded-lg">
        <div className="flex gap-1 items-center">
          <HiOutlineUserCircle className=" text-orange text-4xl" />
          <div className="">
            <h2 className=" font-medium">{contact.name}</h2>
            <p className=" text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex text-3xl">
          <RiEditCircleLine onClick={onOpen} className=" cursor-pointer" />
          <IoMdTrash onClick={() => deleteContact(contact.id)} className=" cursor-pointer text-orange" />
        </div>
      </div>
      <AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default ContactCards