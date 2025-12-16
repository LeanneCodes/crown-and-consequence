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

     // image wrapper
    const imageWrapper = document.createElement("div");
    imageWrapper.style.width = "100%";
    imageWrapper.style.height = "160px";
    imageWrapper.style.overflow = "hidden";
    imageWrapper.style.borderRadius = "8px";
    imageWrapper.style.background = "#f2f2f2";

    // image
    const img = document.createElement("img");
    img.src = character.image;
    img.alt = character.name;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.display = "block";

    imageWrapper.appendChild(img);


      const name = document.createElement("h3");
      name.textContent = character.name;

      const description = document.createElement("p");
      description.textContent = character.description;

      card.append(imageWrapper, name, description);

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
