import {
  faComment,
  faGlobe,
  faPlus,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const BottomBar = () => {
  return (
    <>
      <div className="flex justify-around px-4 py-3 text-xs outline outline-1 outline-slate-300 fixed w-full bottom-0 bg-white rounded-sm lg:flex-col lg:h-60 lg:bottom-[50%] lg:ml-10 lg:left-0 lg:max-w-[20%]">
        <Link to="/">
          <div className="flex flex-col lg:flex-row lg:gap-4 gap-1 justify-center">
            <FontAwesomeIcon className="text-xl" icon={faGlobe} />
            <h2>Community</h2>
          </div>
        </Link>
        <Link to="/chat-ai">
          <div className="flex flex-col lg:flex-row lg:gap-4  gap-1 justify-center">
            <FontAwesomeIcon className="text-xl" icon={faComment} />
            <h2>Chat with AI</h2>
          </div>
        </Link>
        <Link to="/family">
          <div className="flex flex-col lg:flex-row  lg:gap-4  gap-1 justify-center">
            <FontAwesomeIcon className="text-xl" icon={faUsers} />
            <h2>Family</h2>
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="flex flex-col lg:flex-row  lg:gap-4  gap-1 justify-center">
            <FontAwesomeIcon className="text-xl" icon={faUserAlt} />
            <h2>User Dashboard</h2>
          </div>
        </Link>
      </div>
      <Link to="/create-post">
        <div className="bg-primary text-white fixed h-12 w-12 md:w-40 right-6 flex items-center justify-center md:gap-2 rounded-full top-[80%] lg:top-[90%] cursor-pointer ">
          <FontAwesomeIcon icon={faPlus} inverse />
          <p className="hidden md:block">Create a post</p>
        </div>
      </Link>
    </>
  );
};

export default BottomBar;
