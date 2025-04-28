import FormRow from "../../ui/FormRow.jsx";
import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";
import { useForm } from "react-hook-form";
import useLogIn from "../../services/authentication/useLogIn.js";
import { useState } from "react";
import useForgotPassword from "../../services/authentication/useForgotPassword.js";
import { useGlobalContext } from "../GlobalContext.jsx";
import useReactivateRequest from "../../services/authentication/useReactivateRequest.js";

function SignupForm() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { reactivate } = useGlobalContext();

  const { forgotPassword, isLoading: isLoadingForgotPassword } =
    useForgotPassword();
  const { reactivateRequest, isLoading: isLoadingRequest } =
    useReactivateRequest();
  const { login, isLoading } = useLogIn();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
  } = useForm();

  const {
    register: registerReactive,
    handleSubmit: handleReactiveSubmit,
    formState: { errors: reactiveErrors },
  } = useForm();

  function onSubmit({ email, password }) {
    login({ email, password });
  }

  function onResetSubmit({ resetEmail }) {
    forgotPassword({ resetEmail });
  }

  function onReactiveSubmit({ email }) {
    reactivateRequest({ message: "Reactivate my account", email });
  }

  function onError(error) {}

  return (
    <>
      <div className="flex min-h-screen items-center justify-center p-12">
        <div className="w-full max-w-3xl rounded-lg bg-gray-800 p-8 shadow-lg">
          <p className="mb-8 text-center text-lg font-semibold text-gray-100">
            Please Log in your account
          </p>

          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Email" error={errors?.email?.message}>
              <input
                className={"input"}
                placeholder="Enter your email"
                type="email"
                id="email"
                {...register(`email`, {
                  required: "This field is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please provide a valid email address",
                  },
                })}
              />
            </FormRow>

            <FormRow label={"Password"} error={errors?.password?.message}>
              <input
                className="input"
                placeholder="Enter your password"
                type="password"
                id="password"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
            </FormRow>

            <FormRow label="Log in">
              <Button content={"Log in"} disabled={isLoading} />
            </FormRow>

            <FormRow label="Register?">
              <Button content={"Sign Up"} type="link" to="/signup" />
            </FormRow>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-4 text-gray-200 underline underline-offset-2 transition duration-200 hover:text-gray-900"
            >
              Forgot Password
            </button>
          </form>

          {reactivate ? (
            <>
              <form
                onSubmit={handleReactiveSubmit(onReactiveSubmit)}
                className="mt-4"
              >
                <FormRow
                  label={"Reactivate Account"}
                  error={reactiveErrors?.email?.message}
                >
                  <input
                    className="input"
                    placeholder="Enter your email"
                    type="email"
                    id="emailRequest"
                    {...registerReactive("email", {
                      required: "This field is required",
                    })}
                  />
                </FormRow>
                <FormRow label="Send Request">
                  <Button content={"Send"} disabled={isLoadingRequest} />
                </FormRow>
              </form>
            </>
          ) : null}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        modalName="Reset Password"
      >
        <form onSubmit={handleResetSubmit(onResetSubmit)} className="space-y-4">
          {/* <div>
            <label htmlFor="resetEmail" className="mb-1 block text-gray-200">
              Enter your email
            </label>
            <input
              id="resetEmail"
              type="email"
              className="input"
              placeholder="you@example.com"
              {...registerReset("resetEmail", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email",
                },
              })}
            />
            {resetErrors.resetEmail && (
              <p className="mt-1 text-sm text-red-500">
                {resetErrors.resetEmail.message}
              </p>
            )}
          </div> */}

          <FormRow
            label={`Enter your email`}
            error={resetErrors?.resetEmail?.message}
          >
            <input
              id="resetEmail"
              type="email"
              className="input"
              placeholder="you@example.com"
              {...registerReset("resetEmail", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email",
                },
              })}
            />
          </FormRow>

          <div className="flex justify-end gap-4">
            <Button
              content="Send Reset Link"
              type="submit"
              disabled={isLoadingForgotPassword}
            />
          </div>
        </form>
      </Modal>
    </>
  );
}

export default SignupForm;
