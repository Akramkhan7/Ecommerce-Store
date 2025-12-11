import React from "react";

function NewsLetterBox() {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800 ">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio dolorem,
        recusandae minima cupiditate quibusdam id soluta dolor
      </p>

      <form className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-200 pl-3">
        <input
          className="w-full sm:flex-1 outline-nonr"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          onSubmit={(onSubmitHandler)}
          className="bg-black text-white text-xs py-4 px-10 cursor-pointer"
          type="submit"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
}

export default NewsLetterBox;
