import { ErrorMessage, Field, Form, Formik } from "formik"
import Modal from "../Modal/Modal"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { toast } from "react-toastify"
import * as Yup from "yup"

const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string().email("Invalid Email").required("Email is Required")
})

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
    const addContact = async (contact) => {
        try {
            const contactsRef = collection(db, "contacts")
            await addDoc(contactsRef, contact)
            toast.success("Contact Added Successfully")
            onClose()
        } catch (error) {
            console.log(error);
        }
    }
    const Updatecontact = async (contact, id) => {
        try {
            const contactsRef = doc(db, "contacts", id)
            await updateDoc(contactsRef, contact)
            onClose()
            toast.success("Contact Updated Successfully")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <Formik
                    validationSchema={contactSchemaValidation}
                    initialValues={
                        isUpdate
                            ? {
                                name: contact.name,
                                email: contact.email,
                            }
                            : {
                                name: "",
                                email: "",
                            }
                    }
                    onSubmit={(values) => {
                        console.log(values);
                        isUpdate ? Updatecontact(values, contact.id) : addContact(values)
                    }}
                >
                    <Form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Name</label>
                            <Field name="name" className="border h-10 al" />
                            <div className=" text-red-500 text-xs">
                                <ErrorMessage name="name" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" className="border h-10" />
                            <div className=" text-red-500 text-xs">
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                        <button className=" bg-orange px-3 py-1.5 border self-center">{isUpdate ? "Update" : "Add"} Contact</button>
                    </Form>
                </Formik>
            </Modal >
        </>
    )
}

export default AddAndUpdateContact



