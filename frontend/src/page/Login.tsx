import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { RootState } from '../app/store'
import { login, clearError } from '../slices/AuthSlice'

interface Inputs {
  email: string
  password: string
}

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loading, error } = useAppSelector((state: RootState) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await dispatch(login(data)).unwrap()
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4">

      <div className="w-full max-w-sm">

        
        <div className="text-center mb-8">

          <h1 className="text-lg font-semibold tracking-tight text-black">
            Welcome back
          </h1>

          <p className="text-xs text-gray-500 mt-1">
            Sign in to continue
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
              type="email"
              placeholder="Email address"
              className="w-full h-10 px-3 text-xs border border-gray-200 rounded-md bg-white outline-none focus:border-black transition-colors"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
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
                  message: "Minimum 6 characters"
                }
              })}
            />

            {errors.password && (
              <p className="text-[11px] text-gray-500 mt-1">
                {errors.password.message}
              </p>
            )}

            <div className="flex justify-end mt-2">
              <Link
                to="/forget-password"
                className="text-[11px] text-gray-500 hover:text-black transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          
          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-black text-white text-xs font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>

        
        <p className="mt-6 text-center text-[11px] text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-black font-medium hover:underline"
          >
            Create account
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login