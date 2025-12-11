import React, { useEffect, useState } from "react";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook as removeBook,
} from "../servicess/api";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    tags: "",
    status: "Want to Read",
  });

  // Fetch books
  const loadBooks = async () => {
    const res = await getBooks();
    setBooks(res.data);
    setFiltered(res.data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // Filter logic
  useEffect(() => {
    let data = books;

    if (statusFilter) {
      data = data.filter((b) => b.status === statusFilter);
    }

    if (tagFilter.trim()) {
      data = data.filter((b) =>
        b.tags?.some((t) => t.toLowerCase().includes(tagFilter.toLowerCase()))
      );
    }

    setFiltered(data);
  }, [statusFilter, tagFilter, books]);

  // Open modal (add/edit)
  const openModal = (book = null) => {
    if (book) {
      setEditingBook(book);
      setForm({
        title: book.title,
        author: book.author,
        tags: book.tags.join(", "),
        status: book.status,
      });
    } else {
      setEditingBook(null);
      setForm({ title: "", author: "", tags: "", status: "Want to Read" });
    }
    setShowModal(true);
  };

  // Save Book
  const saveBook = async () => {
    const payload = {
      title: form.title,
      author: form.author,
      tags: form.tags.split(",").map((t) => t.trim()),
      status: form.status,
    };

    if (editingBook) {
      await updateBook(editingBook._id, payload);
    } else {
      await addBook(payload);
    }

    loadBooks();
    setShowModal(false);
  };

  // Delete Book
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await removeBook(id);
      loadBooks();
    }
  };

  // Status change from dropdown
  const handleStatusChange = async (id, status) => {
    await updateBook(id, { status });
    loadBooks();
  };

  // Summary Counts
  const total = books?.length || 0;
const want = books?.filter((b) => b.status === "Want to Read")?.length || 0;
const reading = books?.filter((b) => b.status === "Reading")?.length || 0;
const completed = books?.filter((b) => b.status === "Completed")?.length || 0;

  return (
    <div className="p-6">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold">Total Books</h3>
          <p className="text-xl">{total}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold">Want to Read 📖</h3>
          <p className="text-xl">{want}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold">Reading 📘</h3>
          <p className="text-xl">{reading}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold">Completed ✅</h3>
          <p className="text-xl">{completed}</p>
        </div>
      </div>

      {/* Add Book Button */}
      <button
        onClick={() => openModal()}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        + Add New Book
      </button>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Want to Read">Want to Read</option>
          <option value="Reading">Reading</option>
          <option value="Completed">Completed</option>
        </select>

        <input
          type="text"
          placeholder="Filter by tag"
          className="border p-2 rounded"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        />
      </div>

      {/* Book Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Author</th>
              <th className="p-2 border">Tags</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered?.map((book) => (
              <tr key={book._id} className="text-center">
                <td className="p-2 border">{book.title}</td>
                <td className="p-2 border">{book.author}</td>
                <td className="p-2 border">{book.tags.join(", ")}</td>

                <td className="p-2 border">
                  <select
                    value={book.status}
                    onChange={(e) =>
                      handleStatusChange(book._id, e.target.value)
                    }
                    className="border p-1 rounded"
                  >
                    <option>Want to Read</option>
                    <option>Reading</option>
                    <option>Completed</option>
                  </select>
                </td>

                <td className="p-2 border flex justify-center gap-2">
                  <button
                    onClick={() => openModal(book)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl mb-4">
              {editingBook ? "Edit Book" : "Add Book"}
            </h2>

            <input
              type="text"
              placeholder="Title"
              className="w-full border p-2 mb-3 rounded"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              type="text"
              placeholder="Author"
              className="w-full border p-2 mb-3 rounded"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />

            <input
              type="text"
              placeholder="Tags (comma separated)"
              className="w-full border p-2 mb-3 rounded"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />

            <select
              className="w-full border p-2 mb-3 rounded"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>Want to Read</option>
              <option>Reading</option>
              <option>Completed</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveBook}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
