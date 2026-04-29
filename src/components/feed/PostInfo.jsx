"use client";
import { deletePost, updatePost } from "@/lib/actions";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ── Delete Confirm Dialog ── */
function DeleteDialog({ onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-scale-in">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
        </div>
        <h3 className="text-gray-900 font-bold text-lg text-center mb-1">Delete Post?</h3>
        <p className="text-gray-500 text-sm text-center mb-6">
          This action cannot be undone. The post will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-all disabled:opacity-70 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                </svg>
                Deleting...
              </>
            ) : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Edit Modal ── */
function EditModal({ post, onClose, onSaved }) {
  const [desc, setDesc] = useState(post.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSave = async () => {
    if (!desc.trim()) { setError("Post can't be empty."); return; }
    if (desc.trim() === post.description) { onClose(); return; }
    setLoading(true);
    setError(null);
    try {
      await updatePost(post.id, desc.trim());
      onSaved(desc.trim());
      onClose();
    } catch (e) {
      setError("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-base">Edit Post</h3>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-all text-xl">
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-4">
          {/* User info */}
          <div className="flex items-center gap-2.5">
            <Image src={post.user?.avatar || "/noAvatar.png"} alt="" width={36} height={36}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-100" />
            <span className="text-sm font-semibold text-gray-700">
              {post.user?.name && post.user?.surname
                ? post.user.name + " " + post.user.surname
                : post.user?.username}
            </span>
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={desc}
            onChange={(e) => { setDesc(e.target.value); setError(null); }}
            maxLength={255}
            rows={4}
            className="w-full p-3 rounded-xl outline-none bg-gray-50 border border-gray-200 focus:border-blue-400 focus:bg-white transition-all duration-200 resize-none text-sm text-gray-700 placeholder-gray-400"
            placeholder="What's on your mind?"
          />

          {/* Char count + error */}
          <div className="flex items-center justify-between">
            <div>
              {error && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </p>
              )}
            </div>
            <span className={`text-xs font-medium ${desc.length > 230 ? "text-orange-500" : "text-gray-400"}`}>
              {desc.length}/255
            </span>
          </div>

          {/* Image preview (read-only) */}
          {post.img && (
            <div className="relative rounded-xl overflow-hidden border border-gray-100">
              <Image src={post.img} alt="" width={600} height={300}
                className="w-full max-h-48 object-cover opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <span className="text-white text-xs font-semibold bg-black/40 px-3 py-1 rounded-full">
                  Image cannot be changed
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 pb-5">
          <button onClick={onClose} disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50">
            Cancel
          </button>
          <button onClick={handleSave} disabled={loading || !desc.trim()}
            className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                </svg>
                Saving...
              </>
            ) : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main PostInfo ── */
export default function PostInfo({ post, onView }) {
  const [open, setOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await deletePost(post.id);
      setDeleted(true);
    } catch (e) {
      console.error(e);
      setDeleteLoading(false);
      setShowDelete(false);
    }
  };

  const handleSaved = () => {
    router.refresh();
  };

  if (deleted) return null;

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen((v) => !v)}
          className={`p-1.5 rounded-lg transition-all duration-200 ${
            open ? "bg-gray-100 text-blue-600" : "hover:bg-gray-100 text-gray-400 hover:text-gray-600"
          }`}
        >
          <Image src="/more.png" width={18} height={18} alt="More options" />
        </button>

        {open && (
          <div className="absolute top-10 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl p-1.5 w-44 flex flex-col z-50 animate-scale-in origin-top-right">
            {/* View */}
            <button
              onClick={() => { setOpen(false); onView?.(); }}
              className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors duration-150 font-medium"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              View
            </button>

            {/* Edit */}
            <button
              onClick={() => { setOpen(false); setShowEdit(true); }}
              className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors duration-150 font-medium"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit
            </button>

            <div className="h-px bg-gray-100 my-1" />

            {/* Delete */}
            <button
              onClick={() => { setOpen(false); setShowDelete(true); }}
              className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-150 font-medium"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>

      {showDelete && (
        <DeleteDialog
          loading={deleteLoading}
          onConfirm={handleDelete}
          onCancel={() => { if (!deleteLoading) setShowDelete(false); }}
        />
      )}

      {showEdit && (
        <EditModal
          post={post}
          onClose={() => setShowEdit(false)}
          onSaved={handleSaved}
        />
      )}
    </>
  );
}
