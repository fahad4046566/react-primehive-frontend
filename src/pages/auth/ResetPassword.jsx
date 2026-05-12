import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "../../context/AuthContext";
import { useState } from "react";

const ResetPassword = () => {
  const { resetPassword } = useGlobalContext();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [success, setSuccess] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const response = await resetPassword(
      email,
      token,
      data.password,
      data.password_confirmation,
    );

    if (response.data.success) {
      setSuccess(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };
  return (
    <>
      {success && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{success}</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum length is 8" },
            })}
            className="input"
            placeholder="Enter new Password"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}

          <label className="label">Confirm Password</label>
          <input
            {...register("password_confirmation", {
              validate: (val) =>
                // eslint-disable-next-line react-hooks/incompatible-library
                val === watch("password") || "Passwords do not match",
            })}
            className="input"
            placeholder="Enter Confirm Password"
          />
          {errors.password_confirmation && (
            <div className="text-red-500">
              {errors.password_confirmation.message}
            </div>
          )}
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-neutral mt-4"
          >
            {isSubmitting
              ? "Password Updating please wait..."
              : "Update Password"}
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default ResetPassword;
