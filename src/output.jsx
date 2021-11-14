import React from "react";

const Output_container = () => {
  return (
    <form action="" className="flex flex-col space-y-4">
      <div>
        <textarea
          type="TextArea"
          className="textColor fixed bg-gray-700 scrolll opacity-80 shadow-2xl OutputBoxPositions container h-2/5 w-3/5 mt-4 mr-4 mb-8 ml-8 px-4 ring-1 ring-gray-300 rounded-md px-4 py-2"
        />
      </div>
    </form>
  );
};

export default Output_container;
