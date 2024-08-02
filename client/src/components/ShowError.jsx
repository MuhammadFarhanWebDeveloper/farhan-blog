import React from "react";

function ShowError({error}) {
  return <div className="p-3 bg-cyan-200 text-red-600 text-center">{error}</div>;
}

export default ShowError;
