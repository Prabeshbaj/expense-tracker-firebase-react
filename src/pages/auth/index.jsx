import {auth,provider} from "../../config/firebase-config"
import { signInWithPopup } from "firebase/auth"
import {useNavigate} from "react-router-dom";
import "./styles.css";
import { useEffect } from "react";
export const Auth = () => {
const navigate = useNavigate();


const signInWithGoogle = async ()=> {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
        userId: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
    };
    console.log(results);
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
}

    return <div className="login-page">
        <p>Sign in with google to continue</p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
            Sign In with Google
        </button>
    </div>
}