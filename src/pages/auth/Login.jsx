import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Login = () => {
  // const [email, setEmail] = useState(null)
  const [LoginError, setLoginError] = useState(null);
  const [verificationError, setVerificationError] = useState(null);
  const { login, resendEmail } = useGlobalContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  // eslint-disable-next-line react-hooks/incompatible-library
  const email = watch("email");
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setLoginError(null);
    const result = await login(data.email, data.password);

    if (result.success) {
      navigate("/");
    } else if (result.status === 403) {
      setLoginError(result.error);
      setVerificationError(true);
    } else {
    setLoginError(result.error);
    setVerificationError(false);
}
  };
  const handleResendEmail = async () => {
    const result = await resendEmail(email);
    
    if (result.success) {
        alert(result.message);
        setVerificationError(false);
    } else {
        if (result.status === 403) {
            setVerificationError(true); 
        } else {
            alert(result.error);
        }
    }
};

  return (
   <div className="min-h-screen bg-linear-to-br from-base-200 to-base-100 py-8 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md mx-auto">
    {(LoginError || verificationError) && (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm animate-in fade-in slide-in-from-top-2 duration-300">
        {LoginError && (
          <div className="alert alert-warning shadow-lg rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{LoginError}</span>
          </div>
        )}
        {verificationError && (
          <div className="alert alert-info shadow-lg rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p>Did you not receive any verification email?</p>
              <button onClick={handleResendEmail} className="link link-primary text-sm">Resend verification email</button>
            </div>
          </div>
        )}
      </div>
    )}

    {/* Pro Login Card */}
    <div className="card bg-base-100 shadow-2xl rounded-2xl transition-all duration-300 hover:shadow-3xl">
      <div className="card-body p-6 md:p-8">
        <h1 className="text-3xl font-extrabold text-center text-primary">Welcome Back</h1>
        <p className="text-center text-sm text-base-content/70 mb-6">Sign in to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                }
              })}
              className="input input-bordered w-full focus:input-primary transition-all"
            />
            {errors.email && <span className="text-error text-sm mt-1">{errors.email.message}</span>}
          </div>

          {/* Password Field + Forgot Link */}
          <div className="form-control">
            <div className="flex justify-between items-center">
              <label className="label-text font-medium">Password</label>
              <Link to="/forgot-password" className="link link-primary text-sm">Forgot Password?</Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum length is 8" },
              })}
              className="input input-bordered w-full focus:input-primary mt-1"
            />
            {errors.password && <span className="text-error text-sm mt-1">{errors.password.message}</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full mt-2 transition-all duration-200 hover:scale-[1.02]"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <NavLink to="/register" className="link link-primary font-semibold">
              Create one
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>
  );
};

export default Login;
