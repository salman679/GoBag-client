import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/authStore";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const { sendPasswordResetEmail } = useAuthStore();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setError(null);
      await sendPasswordResetEmail(data.email);
      setMessage("A password reset email has been sent.");
    } catch {
      setError("Failed to send reset email. Please check your email address.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl font-bold">Forgot Password</h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg">
          {message && (
            <div className="bg-green-100 text-green-700 p-3 mb-4">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email address"
              type="email"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={errors.email?.message}
            />

            <Button type="submit" fullWidth>
              Send Reset Email
            </Button>
          </form>

          <div className="mt-4 text-center">
            <a href="/login" className="text-blue-600 hover:underline">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
