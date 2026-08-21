"use client";

export default function ConfirmDeleteButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm("Delete this saree? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
      className="text-sm text-ink-soft underline hover:text-maroon"
    >
      Delete
    </button>
  );
}
