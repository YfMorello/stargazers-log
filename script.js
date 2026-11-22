const repositoryList = document.querySelector("#repository-list");

async function loadRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status})`);
    }

    const repositories = await response.json();
    repositoryList.replaceChildren();

    repositories.forEach((repository) => {
      const item = document.createElement("li");
      item.className = "repository";

      const link = document.createElement("a");
      link.className = "repository-name";
      link.href = `https://github.com/${repository.name}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = repository.name;

      const date = document.createElement("time");
      date.className = "starred-date";
      date.dateTime = repository.starred;
      date.textContent = `Starred ${new Date(`${repository.starred}T00:00:00`).toLocaleDateString()}`;

      item.append(link, date);
      repositoryList.append(item);
    });
  } catch (error) {
    repositoryList.innerHTML = '<li class="error">Unable to load starred repositories.</li>';
    console.error(error);
  }
}

loadRepositories();
