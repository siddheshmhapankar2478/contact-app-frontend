"use client";

import { useState } from "react";
import { CircularProgress } from "@mui/material";

import useFetchData from "../hooks/useFetchData";
import { logout } from "../utils/utilityFunction";
import EditContactModal from "./EditContactModal/EditContactModal";
import ConfirmationModal from "../components/ConfirmationModal/ConfirmationModal";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(null);
  const {
    isLoading: pageLoader,
    data: contactData,
    fetchData,
  } = useFetchData({ url: "/api/contact/list" });

  const { fetchData: handleDelete } = useFetchData({
    url: `/api/contact/${showModal?.id}`,
    makeApiCall: false,
    method: "DELETE",
  });

  const deleteContact = async () => {
    try {
      const response = await handleDelete();
      if (response.data) {
        setShowModal(null);
        await fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const contacts = contactData?.results || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Contact Dashboard
          </h1>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Logout
          </button>
        </div>

        {showModal ? (
          showModal?.type === "delete" ? (
            <ConfirmationModal
              text="Are you sure you want to delete this contact?"
              confirmLabel="Delete"
              cancelLabel="Cancel"
              onConfirm={deleteContact}
              onCancel={() => setShowModal(null)}
            />
          ) : (
            <EditContactModal
              onClose={() => setShowModal(false)}
              contactData={showModal?.type === "add" ? null : showModal}
              fetchData={fetchData}
            />
          )
        ) : null}

        <div className="flex justify-end mb-4">
          <button
            className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer ${
              pageLoader ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={pageLoader}
            onClick={() => setShowModal({ type: "add" })}
          >
            + Add Contact
          </button>
        </div>

        {pageLoader ? (
          <div className="text-center">
            <CircularProgress />
            <div className="text-gray-600 text-lg">Loading contacts...</div>
          </div>
        ) : (
          <>
            {contacts.length ? (
              <ul className="space-y-4">
                {contacts.map((contact) => (
                  <li
                    key={contact._id}
                    className="bg-gray-50 p-6 rounded-lg shadow-lg flex flex-col md:flex-row md:items-center justify-between border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-semibold text-gray-800">
                          {contact.name}
                        </p>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                        <p className="text-sm text-gray-600">
                          📞 {contact.phone} | Type: {contact.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <button
                        className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md cursor-pointer"
                        onClick={() => setShowModal(contact)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md cursor-pointer"
                        onClick={() =>
                          setShowModal({ type: "delete", id: contact._id })
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500 text-lg">
                No contacts found. Click Add Contact to create one.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
