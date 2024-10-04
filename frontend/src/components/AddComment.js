import React from 'react';

const AddComment = () => (
  <form className="space-y-4">
    <textarea
      className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
      placeholder="Tell us what you think"
    />
    <button
      type="submit"
      className="bg-[#AE869A] text-white px-4 py-2 rounded hover:bg-[#6E70C1]"
    >
      Post Comment
    </button>
  </form>
);

export default AddComment;
