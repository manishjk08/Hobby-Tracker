import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, clearError } from "../slices/AuthSlice";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { RootState } from "../app/store";
import { useAppDispatch, useAppSelector } from "../app/hook";

interface Inputs {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4">

      <div className="w-full max-w-sm">

        
        <div className="text-center mb-8">

          <h1 className="text-lg font-semibold tracking-tight text-black">
            Create account
          </h1>

          <p className="text-xs text-gray-500 mt-1">
            Start your habit journey today
          </p>

        </div>

        
        {error && (
          <div className="mb-4 border border-red-200 bg-red-50 text-red-600 text-xs px-3 py-2 rounded-md">
            {error}
          </div>
        )}

        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          
          <div>
            <input
              type="text"
              placeholder="Full name"
              className="w-full h-10 px-3 text-xs border border-gray-200 rounded-md bg-white outline-none focus:border-black transition-colors"
              {...register("name", { required: "Name is required" })}
            />

            {errors.name && (
              <p className="text-[11px] text-gray-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-10 px-3 text-xs border border-gray-200 rounded-md bg-white outline-none focus:border-black transition-colors"
              {...register("email", { required: "Email is required" })}
            />

            {errors.email && (
              <p className="text-[11px] text-gray-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full h-10 px-3 text-xs border border-gray-200 rounded-md bg-white outline-none focus:border-black transition-colors"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />

            {errors.password && (
              <p className="text-[11px] text-gray-500 mt-1">
                {errors.password.message}
              </p>
            )}

          </div>

          
          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-black text-white text-xs font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>

        </form>

        
        <p className="mt-6 text-center text-[11px] text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-black font-medium hover:underline"
          >
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;