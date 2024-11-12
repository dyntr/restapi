const postsContainer = document.getElementById("posts-container");

// Fetch and display all blog posts
document.addEventListener("DOMContentLoaded", () => {
  // Fetch and display all blog posts
  fetch("http://3.76.33.89:3000/blog")
    .then((response) => response.json())
    .then((posts) => {
      const postsContainer = document.getElementById("posts-container");
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("blog-post");
        postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <small>by ${post.author} on ${new Date(post.created_at).toLocaleDateString()}</small>
        `;
        postsContainer.appendChild(postElement);
      });
    })
    .catch((error) => console.error("Error fetching posts:", error));

  // Event listener for creating a new blog post
  document.getElementById("create-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const author = document.getElementById("author").value;

    fetch("http://123.45.67.89:3000/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, author }),
    })
      .then((response) => {
        if (response.ok) {
          // Reload posts after successfully adding a new one
          return fetch("http://3.76.33.89:3000/blog");
        }
        throw new Error("Failed to create a post");
      })
      .then((response) => response.json())
      .then((posts) => {
        const postsContainer = document.getElementById("posts-container");
        postsContainer.innerHTML = ""; // Clear existing posts
        posts.forEach((post) => {
          const postElement = document.createElement("div");
          postElement.classList.add("blog-post");
          postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small>by ${post.author} on ${new Date(post.created_at).toLocaleDateString()}</small>
          `;
          postsContainer.appendChild(postElement);
        });
      })
      .catch((error) => console.error("Error creating post:", error));
  });
});



 document.getElementById("logout-button").addEventListener("click", function () {
            localStorage.removeItem("token");
            window.location.href = "index.html";
        });
