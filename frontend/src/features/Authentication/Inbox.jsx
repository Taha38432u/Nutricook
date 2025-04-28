import { FaEnvelope } from "react-icons/fa";
import useInboxMessages from "../../services/authentication/useInboxMessages";
import Loading from "../../ui/Loading";
import Modal from "../../ui/Modal";
import { useState } from "react";
import { format } from "date-fns";

export default function Inbox() {
  const { messages, isLoading } = useInboxMessages();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  if (isLoading) return <Loading />;

  const inboxData = messages?.data || [];

  return (
    <>
      <div className="min-h-screen w-full">
        <div className="mx-auto max-w-7xl rounded-2xl bg-gray-900 p-8 shadow-2xl shadow-gray-800/50 ring-1 ring-gray-700">
          <h2 className="mb-10 text-center text-3xl font-extrabold tracking-wide text-white">
            <FaEnvelope className="mr-2 inline-block" />
            Inbox
          </h2>

          {/* Scrollable Table Container */}
          <div className="custom-scrollbar overflow-x-auto">
            <div className="custom-scrollbar max-h-[500px] overflow-y-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                      Request Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                      Created At
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                      Message
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inboxData.map((message, index) => (
                    <tr
                      key={message._id || index}
                      className={`transition duration-300 ${
                        index % 2 === 0 ? "bg-gray-800/40" : "bg-gray-800/20"
                      } hover:bg-gray-700/40`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-100">
                        {message.userId?.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {message.userId?.email}
                      </td>
                      <td className="px-6 py-4 text-sm capitalize text-gray-300">
                        {message?.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {format(new Date(message.createdAt), "PPPp")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        <button
                          onClick={() => {
                            setSelectedMessage(message.message);
                            setIsModalOpen(true);
                          }}
                          className="inline-block cursor-pointer rounded-full bg-blue-600 px-3 py-1 text-center text-xs font-semibold text-white"
                        >
                          View Message
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* No messages message */}
          {inboxData.length === 0 && (
            <p className="mt-6 text-center text-gray-400">
              No messages in inbox.
            </p>
          )}
        </div>
      </div>

      {/* Modal for Viewing Full Message */}
      <Modal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        modalName="Message"
      >
        <p className="whitespace-pre-line text-gray-100">{selectedMessage}</p>
      </Modal>
    </>
  );
}
