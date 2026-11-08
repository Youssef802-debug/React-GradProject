import { MOCK_POSTS } from "./mockData";

// Simulates a small delay like a real API would have
const fakeDelay = (ms = 600) => new Promise((res) => setTimeout(res, ms));

export async function getAllPostsapi() {
  try {
    await fakeDelay();
    return { posts: MOCK_POSTS, message: "success" };
  } catch (err) {
    console.log(err);
    return { posts: [] };
  }
}

export async function getSingelPostsapi(postId) {
  try {
    await fakeDelay();
    const post = MOCK_POSTS.find((p) => p._id === postId || p.id === postId);
    if (post) {
      return { post, message: "success" };
    }
    return { error: "Post not found" };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
}
