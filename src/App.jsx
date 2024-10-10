import { Children, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import { collection, getDocs, onSnapshot } from "firebase/firestore"
import { db } from "./config/firebase";
import ContactCards from "./components/ContactCards/ContactCards";
import AddAndUpdateContact from "./components/AddandUpdateContact/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NotFoundContact/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([])
  const { isOpen, onClose, onOpen } = useDisclouse()

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts")
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          })
          setContacts(contactLists)
          return contactLists
        })
      } catch (error) {
        console.log(error);
      }
    }
    getContacts()
  }, [])

  const filterContacts = (e) => {
    const value = e.target.value

    const contactsRef = collection(db, "contacts")
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      const filteredContacts = contactLists.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()))
      setContacts(filteredContacts)

      return filteredContacts
    })
  }
  return (
    <>
      <div className=" mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <FaSearch className=" ml-1 text-white text-3xl absolute" />
            <input onChange={filterContacts} type="text" placeholder="Search Contact" className="border flex-grow border-white h-10 text-white pl-9 rounded-md bg-transparent" />
          </div>
          <FaPlusCircle onClick={onOpen} className="text-5xl text-white cursor-pointer" />
        </div>
        <div className=" mt-4 flex flex-col gap-3">
          {contacts.length <= 0 ? <NotFoundContact /> :
            contacts.map((contact) => (
              <ContactCards key={contact.id} contact={contact} />
            ))}
        </div>
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
