import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FaTrash } from "react-icons/fa6";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Bookmarks = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: bookmarks, isLoading } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const res = await axios.get("/api/bookmarks", { withCredentials: true });
      return res.data;
    },
  });

  const { mutate: removeBookmark } = useMutation({
    mutationFn: async (postId) => {
      await axios.post(
        `/api/bookmarks/remove/${postId}`,
        {},
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      toast.success("Bookmark removed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
      <button onClick={() => navigate(-1)} className="flex items-center">
                  <FaArrowLeft className="w-4 h-4" />
                </button>
                <Link to="/bookmarks" className="font-bold mx-auto cursor-pointer">
        <p className="font-bold mx-auto cursor-pointer"  onClick={()=>{
        }}>Bookmarks</p>
        </Link>
      </div>
      {isLoading && (
        <div className="flex justify-center h-full items-center">
          <LoadingSpinner size="lg" />
        </div>
      )}
      {bookmarks?.length === 0 && (
        <div className="text-center p-4 font-bold">
          No bookmarks available 🤔
        </div>
      )}
      {bookmarks?.map((post) => (
        <div
          className="border-b border-gray-700 p-4 flex items-center justify-between"
          key={post._id}
        >
          <div>
            <div>
              <h3 className="font-bold">{post.text}</h3>
            </div>

            {post.img && (
              <img
                src={post.img}
                alt="Post Image"
                className="mt-2 max-w-full h-auto rounded-md"
              />
            )}
          </div>
          <FaTrash
            className="w-5 h-5 text-red-500 cursor-pointer"
            onClick={() => removeBookmark(post._id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;
