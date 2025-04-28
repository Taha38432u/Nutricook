import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Button from "../../ui/Button.jsx";
import FormRow from "../../ui/FormRow.jsx";
import useResetPassword from "../../services/authentication/useResetPassword.js";

function ResetPassword() {
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { resetPassword, isLoading } = useResetPassword();

  const onSubmit = async ({ password, confirmPassword }) => {
    resetPassword({ password, passwordConfirm: confirmPassword, token });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-12">
      <div className="w-full max-w-2xl rounded-lg bg-gray-800 p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-100">
          Reset Your Password
        </h2>
        <p></p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormRow label="New Password" error={errors?.password?.message}>
            <input
              type="password"
              className="input"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
          </FormRow>

          <FormRow
            label="Confirm Password"
            error={errors?.confirmPassword?.message}
          >
            <input
              type="password"
              className="input"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
          </FormRow>

          <div className="flex justify-end">
            <Button content="Reset Password" disabled={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
