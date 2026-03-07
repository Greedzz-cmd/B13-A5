const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const allIssuesCardContainer = document.getElementById(
  "all-issues-card-container",
);
const openIssuesCardContainer = document.getElementById(
  "open-issues-card-container",
);
const closedIssuesCardContainer = document.getElementById(
  "closed-issues-card-container",
);
const issueCount = document.getElementById("issue-count");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchIssuesCardContainer = document.getElementById(
  "search-issues-card-container",
);
const allUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const searchUrl =
  "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}";

const setActive = (activeBtn, activeContainer) => {
  btns = [allBtn, openBtn, closedBtn];
  containers = [
    allIssuesCardContainer,
    openIssuesCardContainer,
    closedIssuesCardContainer,
  ];
  for (btn of btns) {
    btn.classList.remove("btn-primary");

    if (activeBtn === btn) {
      activeBtn.classList.add("btn-primary");
    }
  }

  for (container of containers) {
    container.classList.add("hidden");
    container.classList.remove("grid");
    if (activeContainer === container) {
      activeContainer.classList.remove("hidden");
      activeContainer.classList.add("grid");
    }
  }
};

const loadAllIssues = async () => {
  const res = await fetch(allUrl);
  const data = await res.json();
  displayAllIssues(data.data);
};

const addLabels = (arr) => {
  const htmlElements = arr.map((el) => {
    if (el === "bug") {
      return `<span class="text-xs bg-red-100 border border-red-200 text-red-600 p-1 rounded-2xl">
              ${el}
            </span>`;
    }
    if (el === "help wanted") {
      return `<span class="text-xs bg-yellow-100 border border-yellow-200 text-yellow-600 p-1 rounded-2xl">
              ${el}
            </span>`;
    }
    if (el === "enhancement") {
      return `<span class="text-xs bg-green-100 border border-green-200 text-green-600 p-1 rounded-2xl">
              ${el}
            </span>`;
    }
    if (el === "good first issue") {
      return `<span class="text-xs bg-blue-100 border border-blue-200 text-blue-600 p-1 rounded-2xl">
              ${el}
            </span>`;
    }
    if (el === "documentation") {
      return `<span class="text-xs bg-purple-100 border border-purple-200 text-purple-600 p-1 rounded-2xl">
              ${el}
            </span>`;
    }
  });
  return htmlElements.join(" ");
};

const displayAllIssues = (id) => {
  id.forEach((el) => {
    const card = document.createElement("div");

    card.className = `shadow-md border-t-5 ${el.status === "open" ? "border-green-500" : "border-purple-500"} text-xs rounded-lg space-y-3 p-3`;

    card.innerHTML = `
    <div onclick="">
        <div class="flex justify-between my-3">
          <div>
            ${
              el.status === "open"
                ? `<span class="bg-green-100 text-green-600 p-1 rounded-full">
              <i class="fa-regular fa-circle"></i>
            </span>`
                : `<span class="bg-purple-100 text-purple-600 p-1 rounded-full">
              <i class="fa-regular fa-circle-check"></i>
            </span>`
            }
            
          </div>
          <span class="${el.priority === "high" ? "bg-red-100 text-red-600" : el.priority === "medium" ? "bg-yellow-100 text-yellow-600" : "bg-slate-200 text-slate-600"} py-1 px-4 rounded-2xl">
            ${el.priority}
          </span>
        </div>
        <h2 class="text-base">${el.title}</h2>
        <p class="text-[#64748B] my-2">
          ${el.description}
        </p>
        <div class="flex gap-2">
          
          ${addLabels(el.labels)}
        </div>
      </div>
      <hr class="border border-slate-300" />
      <div class="space-y-2 p-2">
        <p class="text-[#64748B]">#1by john_doe</p>
        <p class="text-[#64748B]">1/15/2024</p>
      </div>
    `;
    allIssuesCardContainer.appendChild(card);
    issueCount.innerText = allIssuesCardContainer.children.length;
  });
};

const loadOpenIssues = async () => {
  const res = await fetch(allUrl);
  const data = await res.json();
  displayOpenIssues(data.data);
};

const displayOpenIssues = (id) => {
  openIssuesCardContainer.innerHTML = "";
  id.forEach((el) => {
    if (el.status === "closed") return;

    const card = document.createElement("div");

    card.className = `shadow-md border-t-5 ${el.status === "open" ? "border-green-500" : "border-purple-500"} text-xs rounded-lg space-y-3 p-3`;

    card.innerHTML = `
    <div onclick="">
        <div class="flex justify-between my-3">
          <div>
            ${
              el.status === "open"
                ? `<span class="bg-green-100 text-green-600 p-1 rounded-full">
              <i class="fa-regular fa-circle"></i>
            </span>`
                : `<span class="bg-purple-100 text-purple-600 p-1 rounded-full">
              <i class="fa-regular fa-circle-check"></i>
            </span>`
            }
            
          </div>
          <span class="${el.priority === "high" ? "bg-red-100 text-red-600" : el.priority === "medium" ? "bg-yellow-100 text-yellow-600" : "bg-slate-200 text-slate-600"} py-1 px-4 rounded-2xl">
            ${el.priority}
          </span>
        </div>
        <h2 class="text-base">${el.title}</h2>
        <p class="text-[#64748B] my-2">
          ${el.description}
        </p>
        <div class="flex gap-2">
          
          ${addLabels(el.labels)}
        </div>
      </div>
      <hr class="border border-slate-300" />
      <div class="space-y-2 p-2">
        <p class="text-[#64748B]">#1by john_doe</p>
        <p class="text-[#64748B]">1/15/2024</p>
      </div>
    `;
    openIssuesCardContainer.appendChild(card);
    issueCount.innerText = openIssuesCardContainer.children.length;
  });
};

const loadClosedIssues = async () => {
  const res = await fetch(allUrl);
  const data = await res.json();
  displayClosedIssues(data.data);
};

const displayClosedIssues = (id) => {
  closedIssuesCardContainer.innerHTML = "";
  id.forEach((el) => {
    if (el.status === "open") return;

    const card = document.createElement("div");

    card.className = `shadow-md border-t-5 ${el.status === "open" ? "border-green-500" : "border-purple-500"} text-xs rounded-lg space-y-3 p-3`;

    card.innerHTML = `
    <div onclick="">
        <div class="flex justify-between my-3">
          <div>
            ${
              el.status === "open"
                ? `<span class="bg-green-100 text-green-600 p-1 rounded-full">
              <i class="fa-regular fa-circle"></i>
            </span>`
                : `<span class="bg-purple-100 text-purple-600 p-1 rounded-full">
              <i class="fa-regular fa-circle-check"></i>
            </span>`
            }
            
          </div>
          <span class="${el.priority === "high" ? "bg-red-100 text-red-600" : el.priority === "medium" ? "bg-yellow-100 text-yellow-600" : "bg-slate-200 text-slate-600"} py-1 px-4 rounded-2xl">
            ${el.priority}
          </span>
        </div>
        <h2 class="text-base">${el.title}</h2>
        <p class="text-[#64748B] my-2">
          ${el.description}
        </p>
        <div class="flex gap-2">
          
          ${addLabels(el.labels)}
        </div>
      </div>
      <hr class="border border-slate-300" />
      <div class="space-y-2 p-2">
        <p class="text-[#64748B]">#1by john_doe</p>
        <p class="text-[#64748B]">1/15/2024</p>
      </div>
    `;
    closedIssuesCardContainer.appendChild(card);
    issueCount.innerText = closedIssuesCardContainer.children.length;
  });
};

allBtn.addEventListener("click", () => {
  setActive(allBtn, allIssuesCardContainer);
  searchIssuesCardContainer.classList.add("hidden");
  searchIssuesCardContainer.classList.remove("grid");
  issueCount.innerText = allIssuesCardContainer.children.length;
});

openBtn.addEventListener("click", () => {
  setActive(openBtn, openIssuesCardContainer);
  searchIssuesCardContainer.classList.add("hidden");
  searchIssuesCardContainer.classList.remove("grid");
  loadOpenIssues();
});

closedBtn.addEventListener("click", () => {
  setActive(closedBtn, closedIssuesCardContainer);
  searchIssuesCardContainer.classList.add("hidden");
  searchIssuesCardContainer.classList.remove("grid");
  loadClosedIssues();
});

const searchIssues = async (value) => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`,
  );
  const data = await res.json();
  displaySearch(data.data);
};

const displaySearch = (value) => {
  searchIssuesCardContainer.innerHTML = "";
  value.forEach((el) => {
    const card = document.createElement("div");

    card.className = `shadow-md border-t-5 ${el.status === "open" ? "border-green-500" : "border-purple-500"} text-xs rounded-lg space-y-3 p-3`;

    card.innerHTML = `
    <div onclick="">
        <div class="flex justify-between my-3">
          <div>
            ${
              el.status === "open"
                ? `<span class="bg-green-100 text-green-600 p-1 rounded-full">
              <i class="fa-regular fa-circle"></i>
            </span>`
                : `<span class="bg-purple-100 text-purple-600 p-1 rounded-full">
              <i class="fa-regular fa-circle-check"></i>
            </span>`
            }
            
          </div>
          <span class="${el.priority === "high" ? "bg-red-100 text-red-600" : el.priority === "medium" ? "bg-yellow-100 text-yellow-600" : "bg-slate-200 text-slate-600"} py-1 px-4 rounded-2xl">
            ${el.priority}
          </span>
        </div>
        <h2 class="text-base">${el.title}</h2>
        <p class="text-[#64748B] my-2">
          ${el.description}
        </p>
        <div class="flex gap-2">
          
          ${addLabels(el.labels)}
        </div>
      </div>
      <hr class="border border-slate-300" />
      <div class="space-y-2 p-2">
        <p class="text-[#64748B]">#1by john_doe</p>
        <p class="text-[#64748B]">1/15/2024</p>
      </div>
    `;
    searchIssuesCardContainer.appendChild(card);
    issueCount.innerText = searchIssuesCardContainer.children.length;
  });
};

searchBtn.addEventListener("click", () => {
  const searchInputValue = searchInput.value;
  const filteredSearchValue = searchInputValue.trim().toLowerCase();
  searchIssues(filteredSearchValue);
  searchIssuesCardContainer.classList.remove("hidden");
  searchIssuesCardContainer.classList.add("grid");
  setActive();
});

loadAllIssues();
setActive(allBtn, allIssuesCardContainer);
