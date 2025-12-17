document.addEventListener("DOMContentLoaded", async () => {
  const wrapper = document.getElementById("story-wrapper");

  if (!wrapper) {
    console.error("story-wrapper element not found in DOM");
    return;
  }

  try {
    const response = await fetch("/api/stories");
    const stories = await response.json();

    console.log("Stories from API:", stories);

    if (!response.ok) {
      wrapper.textContent = "Failed to load stories";
      return;
    }

    if (!Array.isArray(stories) || stories.length === 0) {
      wrapper.textContent = "No stories available";
      return;
    }

    stories.forEach((story, index) => {
      const card = document.createElement("div");
      const isUnlocked = index === 0;

      card.className = `story-card ${isUnlocked ? "active" : "locked"}`;

      const banner = document.createElement("div");
      banner.className = "image-banner";
      banner.textContent = isUnlocked ? "Quest unlocked" : "Quest locked 🔒";

      const body = document.createElement("div");
      body.className = "card-body";

      const title = document.createElement("h3");
      title.textContent = story.title;

      const description = document.createElement("p");
      description.textContent = story.description || "Coming soon";

      const button = document.createElement("button");
      button.textContent = isUnlocked ? "Select" : "Locked";
      button.disabled = !isUnlocked;

      if (isUnlocked) {
        button.addEventListener("click", () => {
          window.location.href = `/characters?storyId=${story.id}`;
        });
      }

      body.appendChild(title);
      body.appendChild(description);
      body.appendChild(button);

      card.appendChild(banner);
      card.appendChild(body);

      wrapper.appendChild(card);
    });

  } catch (err) {
    console.error("Fetch error:", err);
    wrapper.textContent = "Something went wrong";
  }
});
