import React from "react";
import router from "next/router";

function BackButton() {


    return (
      <button type="button" onClick={() => router.replace("/dashboard")}>
        Back
      </button>
    );
}


export default BackButton;
