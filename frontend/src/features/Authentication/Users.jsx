import { useForm } from "react-hook-form";
import useUsers from "../../services/authentication/useAllUsers";
import Loading from "../../ui/Loading.jsx";
import FormRow from "../../ui/FormRow";
import useUpdateUserAdmin from "../../services/authentication/useUpdateUserAdmin.js";

export default function Users() {
  const { register, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;

  const { users: allUsers, isLoading } = useUsers();
  const { updateUserAdmin, isPending } = useUpdateUserAdmin();

  const watchEmail = watch("email")?.toLowerCase() || "";
  const watchName = watch("name")?.toLowerCase() || "";
  const watchStatus = watch("status") || "all";

  const filteredUsers = allUsers?.filter((user) => {
    const matchesEmail = user.email.toLowerCase().includes(watchEmail);
    const matchesName = user.name.toLowerCase().includes(watchName);
    const matchesStatus =
      watchStatus === "all" ||
      (watchStatus === "active" && user.active) ||
      (watchStatus === "inactive" && !user.active);

    return matchesEmail && matchesName && matchesStatus;
  });

  function onSubmit() {}
  function onError() {}

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto w-full max-w-5xl rounded-2xl bg-gray-900 p-8 shadow-2xl shadow-gray-800/50 ring-1 ring-gray-700">
        <h2 className="mb-10 text-center text-3xl font-extrabold tracking-wide text-white">
          👥 User Directory
        </h2>

        {/* Filters Form */}
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="mb-8 space-y-6"
        >
          <div className="grid grid-cols-3 gap-4">
            <FormRow label="Email" error={errors?.email?.message}>
              <input
                className="input"
                placeholder="Email"
                type="text"
                id="email"
                {...register("email")}
              />
            </FormRow>
            <FormRow label="Name" error={errors?.name?.message}>
              <input
                className="input"
                placeholder="Name"
                type="text"
                id="name"
                {...register("name")}
              />
            </FormRow>
            <FormRow label="Status">
              <select
                className="input"
                id="status"
                {...register("status")}
                defaultValue="all"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </FormRow>
          </div>
        </form>

        {/* User Table */}
        <div className="custom-scrollbar overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-400">#</th>
                <th className="px-6 py-4 font-semibold text-gray-400">Name</th>
                <th className="px-6 py-4 font-semibold text-gray-400">Email</th>
                <th className="px-6 py-4 font-semibold text-gray-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`transition duration-300 ${
                    index % 2 === 0 ? "bg-gray-800/40" : "bg-gray-800/20"
                  } hover:bg-gray-700/40`}
                >
                  <td className="px-6 py-4 font-mono text-gray-400">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-gray-100">{user.name}</td>
                  <td className="px-6 py-4 text-gray-300">{user.email}</td>
                  <td className="px-6 py-4">
                    <button
                      className={`inline-block min-w-20 cursor-pointer rounded-full px-3 py-1 text-center text-xs font-semibold shadow-sm ${
                        user.active
                          ? "bg-green-600/80 text-white"
                          : "bg-red-600/80 text-white"
                      }`}
                      onClick={() =>
                        updateUserAdmin({ id: user.id, active: !user.active })
                      }
                      disabled={isPending}
                    >
                      {user.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Users */}
        {filteredUsers.length === 0 && (
          <p className="mt-6 text-center text-gray-400">No users found.</p>
        )}
      </div>
    </div>
  );
}
