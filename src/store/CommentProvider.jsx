import { collection, getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";

const CommentContext = createContext();

export function CommentProvider({ children }) {
    const [comment, setComment] = useState([]);
    const getAllComment = async () => {
        const querySnapshot = await getDocs(collection(db, "rate"));
        const data = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push({ ...doc.data(), id: doc.id });
        });
        setComment(data);
    };
    useEffect(() => {
        getAllComment();
    }, []);
    return (
        <CommentContext.Provider value={{ comment }}>
            {children}
        </CommentContext.Provider>
    );
}

CommentProvider.propTypes = {
    children: PropTypes.node,
};

const useComment = () => useContext(CommentContext);
export default useComment;
