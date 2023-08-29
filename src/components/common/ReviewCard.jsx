import PropTypes from "prop-types";
import TitleAvatar from "./TitleAvatar";
import RatingNumber from "./RatingNumber";
import { memo, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function ReviewCard({ theme = "default", comment, uid, vote }) {
    const [username, setUsername] = useState("");
    useEffect(() => {
        const getUser = async () => {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUsername(docSnap.data().email);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        };
        getUser();
    }, [uid]);
    return (
        <div className={`review-card ${theme}`}>
            <TitleAvatar />
            <div className="card-content">
                <div className="user">
                    <p className="username">{username}</p>
                    <RatingNumber
                        theme={theme === "default" ? "dark" : "default"}
                        numberStar={vote}
                    />
                </div>
                <p className="user-comment">{comment}</p>
            </div>
        </div>
    );
}

const MemoReviewCard = memo(ReviewCard);
export default MemoReviewCard;
ReviewCard.propTypes = {
    theme: PropTypes.oneOf(["dark", "default"]),
};
