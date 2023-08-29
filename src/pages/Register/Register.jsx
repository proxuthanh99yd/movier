import { useEffect } from "react";
import { auth, db } from "../../firebaseConfig";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
    Input,
    confirm_password_validation,
    email_validation,
    fullName_validation,
    password_validation,
} from "../../components";
import { FormProvider, useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";

function Register() {
    const navigate = useNavigate();
    const methods = useForm();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
                navigate("/");
                console.log("uid", uid);
            }
        });
    }, []);

    const onSubmit = methods.handleSubmit((data) => {
        if (data.password === data.cfPassword) {
            const id = toast.loading("Login...");
            const { fullName, email, password } = data;
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user);
                    setDoc(doc(db, "users", user.uid), {
                        fullName,
                        email,
                    });
                    toast.update(id, {
                        render: `Hello ${user.email}`,
                        type: "success",
                        isLoading: false,
                        autoClose: 3000,
                    });
                    methods.reset();
                    navigate("/");
                })
                .catch((error) => {
                    // const errorCode = error.code;
                    const errorMessage = error.message;

                    toast.update(id, {
                        render: `${errorMessage} `,
                        type: "error",
                        isLoading: false,
                        autoClose: 3000,
                    });
                });
        } else {
            methods.setError(
                "cfPassword",
                { type: "focus", message: "confirm password not match" },
                { shouldFocus: true }
            );
        }
    });

    return (
        <div className="register-container">
            <div className="ellipse ellipse__top ellipse__top--left"></div>
            <div className="ellipse ellipse__top ellipse__top--right"></div>
            <div className="ellipse ellipse__bottom ellipse__bottom--left"></div>
            <div className="ellipse ellipse__bottom ellipse__bottom--right"></div>
            <div className="login-form">
                <div className="login-form__logo">
                    <Link to="/">
                        <img src="images/logo.png" alt="logo" />
                    </Link>
                </div>
                <p className="login-form__title">Register</p>
                <FormProvider {...methods}>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        noValidate
                        autoComplete="on"
                        className="login-form__form"
                    >
                        <Input {...fullName_validation} />
                        <Input {...email_validation} />
                        <Input {...password_validation} />
                        <Input {...confirm_password_validation} />
                        <div className="form-btn">
                            <button onClick={onSubmit}>CREATE ACCOUNT</button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

export default Register;
