import { faComment, faGlobe, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const BottomBar = () => {
  return (
    <div className="flex justify-around px-4 py-3 text-xs outline outline-1 outline-slate-300 fixed w-full bottom-0">
      <div className="flex flex-col gap-1 justify-center">
        <FontAwesomeIcon className="text-xl" icon={faGlobe} />
        <h2>Community</h2>
      </div>
      <div className="flex flex-col gap-1 justify-center">
        <FontAwesomeIcon className="text-xl" icon={faComment} />
        <h2>Chat with AI</h2>
      </div>
      <div className="flex flex-col gap-1 justify-center">
        <FontAwesomeIcon className="text-xl" icon={faUsers} />
        <h2>Family</h2>
      </div>
      <div className="flex flex-col gap-1 justify-center">
        <FontAwesomeIcon className="text-xl" icon={faUserAlt} />
        <h2>User Dashboard</h2>
      </div>
    </div>
  );
};

export default BottomBar;
