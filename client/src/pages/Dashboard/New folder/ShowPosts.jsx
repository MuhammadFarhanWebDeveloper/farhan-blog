import React from "react";
import {} from "react-icons/md";
import { Link } from "react-router-dom";
function ShowPosts() {
  const posts = [
    {
      id: 1,
      title: "Learn Python",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore iusto voluptatum totam eaque quidem maiores soluta, eum, voluptatem dolor libero optio?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nulla voluptas, a aut molestias ratione veritatis sit dolorem modi excepturi optio.",
    },
    {
      id: 2,
      title: "What is Server Action in Next.js",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore iusto voluptatum totam eaque quidem maiores soluta, eum, voluptatem dolor libero optio?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nulla voluptas, a aut molestias ratione veritatis sit dolorem modi excepturi optio.",
    },
    {
      id: 3,
      title: "What is Destructuring in JavaScript",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore iusto voluptatum totam eaque quidem maiores soluta, eum, voluptatem dolor libero optio?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nulla voluptas, a aut molestias ratione veritatis sit dolorem modi excepturi optio.",
    },
  ];
  return (
    <div className="mx-auto bg-gray-700 rounded w-fit">
      <h1 className="text-2xl font-bold text-center text-purple-500 mb-4">Posts</h1>
      <table className="">
        <thead>
          <tr className="">
            <th className="text-start py-2 px-6 border-b">Title</th>
            <th className="text-start py-2 px-6 border-b">Description</th>
            <th className="text-start py-2 px-6 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post, index) => {
            return (
              <tr key={index}>
                <td className="py-2 px-6 border-b">{post.title}</td>
                <td className="py-2 px-6 border-b">
                  {post.description.length > 40
                    ? post.description.slice(0, 38) + "..."
                    : post.description}
                </td>
                <td className="py-2 px-6 border-b">
                  <Link to={`/dasboard/post/${post.id}`} className="bg-blue-700 px-2 p-1 rounded">See Post</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ShowPosts;
