import ChatBox from "../../components/ChatBox";
import ConversationsList from "../../components/ConversationsList";
import { SlLogout } from "react-icons/sl";
import useUserStore from "../../hooks/userStore";
import { useState } from "react";



const Home = () => {
  const clearUser = useUserStore((state) => state.clearUser);
  const [loading, setLoading] = useState(false);

  const handleLogout = async() => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setLoading(false);
      clearUser();
      
    } catch (error) {
      console.log(error);  
    }
  };

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-600">
      <div className="flex-col m-4 relative">
        <form className="">
          <label className="input input-bordered flex items-center gap-2">
            <input id="searchHome" type="text" className="grow" placeholder="Search" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd"/>
            </svg>
          </label>
        </form>
        <div className="divider my-2"></div>
        <ConversationsList />
        <button onClick={handleLogout}>
          {loading && <div className="spinner"></div>}
          <SlLogout className="absolute bottom-2 left-1 text-2xl cursor-pointer"/>
        </button>
      </div>
      <ChatBox/>
    </div>
  );
};

export default Home;
