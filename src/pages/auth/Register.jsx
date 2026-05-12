import {  NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Register = () => {
  const [registerError, setRegisterError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { registerUser } = useGlobalContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
 const navigate = useNavigate();
  const onSubmit = async (data) => {
    setRegisterError(null);
    const result = await registerUser(
      data.name,
      data.email,
      data.password,
      data.password_confirmation,
    );
  
    if (result.success) {
        setSuccess(result.message);  
         setTimeout(() => {
        navigate('/login');  
    }, 2000);
    } else {
        setRegisterError(result.error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-base-200 to-base-100 py-8 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md mx-auto">
    {/* Toast-style Alert Container */}
    {(registerError || success) && (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm animate-in fade-in slide-in-from-top-2 duration-300">
        {registerError && (
          <div className="alert alert-error shadow-lg rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{registerError}</span>
          </div>
        )}
        {success && (
          <div className="alert alert-success shadow-lg rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{success}</span>
          </div>
        )}
      </div>
    )}

    {/* Pro Form Card */}
    <div className="card bg-base-100 shadow-2xl rounded-2xl transition-all duration-300 hover:shadow-3xl">
      <div className="card-body p-6 md:p-8">
        <h1 className="text-3xl font-extrabold text-center text-primary">Create Account</h1>
        <p className="text-center text-sm text-base-content/70 mb-6">Get started with PrimeHive</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("name", { required: "First name is required", minLength: { value: 2, message: "Too short" } })}
              className="input input-bordered w-full focus:input-primary transition-all"
            />
            {errors.name && <span className="text-error text-sm mt-1">{errors.name.message}</span>}
          </div>

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
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
              })}
              className="input input-bordered w-full focus:input-primary"
            />
            {errors.email && <span className="text-error text-sm mt-1">{errors.email.message}</span>}
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required", minLength: { value: 8, message: "Minimum length is 8" } })}
              className="input input-bordered w-full focus:input-primary"
            />
            {errors.password && <span className="text-error text-sm mt-1">{errors.password.message}</span>}
          </div>

          {/* Confirm Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              // eslint-disable-next-line react-hooks/incompatible-library
              {...register("password_confirmation", { validate: val => val === watch("password") || "Passwords do not match" })}
              className="input input-bordered w-full focus:input-primary"
            />
            {errors.password_confirmation && <span className="text-error text-sm mt-1">{errors.password_confirmation.message}</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full mt-4 transition-all duration-200 hover:scale-[1.02]"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Sign Up"
            )}
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <NavLink to="/login" className="link link-primary font-semibold">
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default Register;
