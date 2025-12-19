import { auth, db } from "../components/firebase"
import { doc, getDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { useState, useEffect } from "react"

const Chat = () => {
    const [userDetails, setUserDetails] = useState(null);

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            // console.log(user);
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserDetails(docSnap.data());
            } else {
                console.log("user is not logged in.");
            }
        });
    }

    const handleLogout = () => {
        try {
            auth.signOut();
            console.log("User logged out successfully");
            toast.success("User logged out successfully", { position: "top-center" });
            window.location.href = "/login";
        }
        catch (error) {
            console.log(error.message);
            toast.error(error.message, { position: "bottom-center" });
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div>
            {
                userDetails ? (
                    <>
                        <h3>Welcome: {userDetails.name}</h3>
                        <div>
                            <p>Email: {userDetails.email}</p>
                        </div>
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
        </div>
    )
}

export default Chat