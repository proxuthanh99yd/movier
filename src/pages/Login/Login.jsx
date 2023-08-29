import { useEffect } from "react";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { Input, email_validation, password_validation } from "../../components";
import { FormProvider, useForm } from "react-hook-form";
import { useLogin } from "../../store";

function Login() {
    const { isLogin, setIsLogin } = useLogin();
    const navigate = useNavigate();
    const methods = useForm();
    const onSubmit = methods.handleSubmit((data) => {
        const id = toast.loading("Login...");
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                toast.update(id, {
                    render: `Hello ${user.email}`,
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
                setIsLogin(user.uid);
                navigate(-1, { replace: true });
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
    });
    useEffect(() => {
        if (isLogin) {
            navigate(-1, { replace: true });
        }
    }, []);
    return (
        <div className="login-container">
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
                <p className="login-form__title">Login into your account</p>
                <FormProvider {...methods}>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        noValidate
                        autoComplete="on"
                        className="login-form__form"
                    >
                        <Input {...email_validation} />
                        <Input {...password_validation} />
                        <div className="form-forgot">
                            <div className="form-checkbox">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="form-control"
                                />
                                <label
                                    htmlFor="remember"
                                    className="form-label"
                                >
                                    Remember Me
                                </label>
                            </div>
                            <div className="forgot">
                                <a href="#!">Forgot password?</a>
                            </div>
                        </div>
                        <div className="form-btn">
                            <button onClick={onSubmit}>LOGIN NOW</button>
                        </div>
                    </form>
                </FormProvider>
                <span className="or">OR</span>
                <div className="sign-up">
                    <Link to="/register">SIGN UP NOW</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
