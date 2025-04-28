import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow.jsx";
import Button from "../../ui/Button.jsx";
import useUpdateUser from "../../services/authentication/useUpdateUser.js";
import useUser from "../../services/authentication/useUser.js";
import useUpdatePassword from "../../services/authentication/useUpdatePassword.js";
import toast from "react-hot-toast";

function UpdateForm() {
  // Form states for different sections
  const usernameForm = useForm();
  const emailForm = useForm();
  const passwordForm = useForm();
  const disableAccountForm = useForm();
  const { isUpdating, updateUser } = useUpdateUser();
  const { isUpdating: isUpdatingPassword, updatePassword } =
    useUpdatePassword();
  const { isLoading, user } = useUser();

  // Handlers for form submissions
  function handleUsernameSubmit({ name }) {
    updateUser({ name });
  }

  function handleEmailSubmit({ email }) {
    updateUser({ email });
  }

  function handleDisableAccountSubmit({ email }) {
    if (email === user.user.email) {
      updateUser({ active: false });
    } else {
      toast.error("Details are wrong");
    }
  }

  function handlePasswordSubmit({
    passwordCurrent,
    password,
    passwordConfirm,
  }) {
    updatePassword({ passwordCurrent, password, passwordConfirm });
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <h1> Loading </h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-12 p-6">
      {/* Username Update Form */}
      <div className="w-full max-w-3xl rounded-lg bg-gray-800 p-8 shadow-lg">
        <h2 className="mb-6 text-lg font-semibold text-gray-100">
          Update Username
        </h2>
        <form onSubmit={usernameForm.handleSubmit(handleUsernameSubmit)}>
          <FormRow label="Current Username">
            <input
              className="input cursor-not-allowed bg-gray-500"
              defaultValue={user.user.name}
              disabled
            />
          </FormRow>

          <FormRow
            label="Username"
            error={usernameForm.formState.errors?.username?.message}
          >
            <input
              className="input"
              placeholder="Enter new username"
              type="text"
              {...usernameForm.register("name", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <Button content="Update Username" disabled={isUpdating} />
        </form>
      </div>

      {/* Email Update Form */}
      <div className="w-full max-w-3xl rounded-lg bg-gray-800 p-8 shadow-lg">
        <h2 className="mb-6 text-lg font-semibold text-gray-100">
          Update Email
        </h2>
        <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)}>
          <FormRow label="Current Email">
            <input
              className="input cursor-not-allowed bg-gray-500"
              defaultValue={user.user.email}
              disabled
            />
          </FormRow>

          <FormRow
            label="Email"
            error={emailForm.formState.errors?.email?.message}
          >
            <input
              className="input"
              placeholder="Enter new email"
              type="email"
              {...emailForm.register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
              })}
            />
          </FormRow>
          <Button content="Update Email" disabled={isUpdating} />
        </form>
      </div>

      {/* Password Update Form */}
      <div className="w-full max-w-3xl rounded-lg bg-gray-800 p-8 shadow-lg">
        <h2 className="mb-6 text-lg font-semibold text-gray-100">
          Update Password
        </h2>
        <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}>
          <FormRow
            label="Current Password"
            error={passwordForm.formState.errors?.passwordCurrent?.message}
          >
            <input
              className="input"
              placeholder="Enter current password"
              type="password"
              {...passwordForm.register("passwordCurrent", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow
            label="New Password"
            error={passwordForm.formState.errors?.password?.message}
          >
            <input
              className="input"
              placeholder="Enter new password"
              type="password"
              {...passwordForm.register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
          </FormRow>

          <FormRow
            label="Confirm New Password"
            error={passwordForm.formState.errors?.passwordConfirm?.message}
          >
            <input
              className="input"
              placeholder="Confirm new password"
              type="password"
              {...passwordForm.register("passwordConfirm", {
                required: "This field is required",
                validate: (value) =>
                  value === passwordForm.getValues("password") ||
                  "Passwords must match",
              })}
            />
          </FormRow>
          <Button content="Update Password" disabled={isUpdatingPassword} />
        </form>
      </div>

      <div className="w-full max-w-3xl rounded-lg bg-gray-800 p-8 shadow-lg">
        <h2 className="mb-6 text-lg font-semibold text-gray-100">
          Disable Your Account
        </h2>
        <h2 className="mb-6 text-lg font-semibold text-red-600">
          Enter your email
        </h2>
        <form
          onSubmit={disableAccountForm.handleSubmit(handleDisableAccountSubmit)}
        >
          <FormRow
            label="Email"
            error={disableAccountForm.formState.errors?.email?.message}
          >
            <input
              className="input"
              placeholder="Current Email"
              type="password"
              {...disableAccountForm.register("email", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <Button
            content="Disable Account"
            type="button-delete"
            customClasses="w-full rounded-lg"
            disabled={isUpdating}
          />
        </form>
      </div>
    </div>
  );
}

export default UpdateForm;
