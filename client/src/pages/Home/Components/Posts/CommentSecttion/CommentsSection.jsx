import { useLoaderData } from "react-router-dom";
import Comment from "./Comment";

function CommentsSection({postComments, setPostComments}) {
  
  return (
    <div className="flex flex-col m-2 p-2 gap-2">
      {postComments?.map((item, index) => {
        return (
          <Comment
            key={index}
            comment={item}
            setPostComments={setPostComments}
            postComments={postComments}
          />
        );
      })}
    </div>
  );
}

export default CommentsSection;
