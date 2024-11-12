// Success.js
import React from "react";

function Success() {
  return (
    <div className="success-page">
      <h2>File uploaded successfully!</h2>
      <p>
        Your file has been uploaded and processed. You can view it{" "}
        <a href="/uploads/your_file_name_here">here</a>.
      </p>
    </div>
  );
}

export default Success;
