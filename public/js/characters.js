const wrapper = document.getElementById("characters-wrapper");

// get storyId from URL
const params = new URLSearchParams(window.location.search);
const storyId = params.get("storyId");

if (!storyId) {
  wrapper.textContent = "No story selected.";
  throw new Error("Missing storyId");
}

fetch(`/api/stories/${storyId}/characters`)
  .then(res => res.json())
  .then(characters => {
    wrapper.innerHTML = "";

    console.log(characters)

    characters.forEach((character, index) => {
      const card = document.createElement("div");
      card.className = "option-item";

      // only first character selectable
      if (index === 0) {
        card.classList.add("active");
        card.onclick = () => {
          window.location.href = `/scenes?characterId=${character.id}`;
        };
      } else {
        card.classList.add("locked");
      }

      // image
      const img = document.createElement("img");
      img.className = "character-image";
      img.src = character.image;
      img.alt = character.name;

      // if image fails, just show name
    //   img.onerror = () => {
    //     img.remove();
    //   };

      const name = document.createElement("h3");
      name.textContent = character.name;

      const description = document.createElement("p");
      description.textContent = character.description;

      card.append(img, name, description);

      if (index === 0) {
        const button = document.createElement("button");
        button.textContent = "Select";
        card.appendChild(button);
      }

      wrapper.appendChild(card);
    });
  })
  .catch(err => {
    wrapper.textContent = "Something went wrong loading characters.";
    console.error(err);
  });
