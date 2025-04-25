import React, { useState } from "react";
import { toast } from 'react-toastify';

function DeleteModal({ client, onClose, onDelete }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (usernameInput.toLowerCase() !== "delete") {
      setError("You must type 'delete' to confirm.");
      toast.error("Username does not match");
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      await onDelete();
      onClose();
    } catch (err) {
      toast.error("Failed to delete. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900">
              Delete Client
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600">
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-medium">
                {client.first_name} {client.last_name}
              </span>{" "}
              and all associated data.
            </p>

            <div className="mt-4">
              <label
                htmlFor="username-confirm"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Please type{" "} delete
                <span className="font-mono font-bold">{client.username}</span>{" "}
                to confirm
              </label>
              <input
                type="text"
                id="username-confirm"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                autoComplete="off"
              />
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={usernameInput.toLowerCase() !== "delete" || isDeleting}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                usernameInput.toLowerCase() !== "delete" || isDeleting
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isDeleting ? "Deleting..." : "Delete Client"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
