import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import LoadingSpinner from "../../components/common/LoadingSpinner";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { refetch } = useQuery({
    queryKey: ["searchUsers", query],
    queryFn: async () => {
      if (!query) return [];
      setIsLoading(true);
      try {
        const response = await fetch(`/api/users/search?username=${query}`, {
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    enabled: false // Disable automatic fetching
  });

  const handleChange = (e) => {
    setQuery(e.target.value);
    refetch();
  };

  return (
    <div className="flex-1 border-r border-gray-700 min-h-screen p-4">
      
      <div className="w-full max-w-3xl mx-auto">
      <button 
            onClick={() => navigate(-1)} 
            className="p-2 mr-2 mb-2  text-white rounded-full shadow-lg"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for users"
            className="w-full p-3 pl-10 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center mt-4">
            <LoadingSpinner size="lg" />
          </div>
        ) : searchResults.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No user found</p>
        ) : (
          <div className="mt-4">
            {searchResults.map((user) => (
              <div
                key={user._id}
                className="flex items-center p-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate(`/profile/${user.username}`)}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={user.profileImg || "/avatar-placeholder.png"} alt={user.username} className="object-cover w-full h-full" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">{user.fullName}</p>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
