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
const allUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

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

// {
//     "id": 9,
//     "title": "Add export to PDF feature",
//     "description": "Users want to export reports and dashboards to PDF format for sharing and printing.",
//     "status": "open",
//     "labels": [
//         "enhancement"
//     ],
//     "priority": "medium",
//     "author": "feature_fred",
//     "assignee": "",
//     "createdAt": "2024-01-16T10:15:00Z",
//     "updatedAt": "2024-01-16T10:15:00Z"
// }

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
  let total = 0;
  id.forEach((el) => {
    total += 1;

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
    issueCount.innerText = total;
  });
};

const loadOpenIssues = async () => {
  const res = await fetch(allUrl);
  const data = await res.json();
  displayOpenIssues(data.data);
};

const displayOpenIssues = (id) => {
  let total = 0;
  id.forEach((el) => {
    if (el.status === "closed") return;
    total += 1;

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
    issueCount.innerText = total;
  });
};

const loadClosedIssues = async () => {
  const res = await fetch(allUrl);
  const data = await res.json();
  displayClosedIssues(data.data);
};

const displayClosedIssues = (id) => {
  let total = 0;
  id.forEach((el) => {
    if (el.status === "open") return;
    total += 1;

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
    issueCount.innerText = total;
  });
};

allBtn.addEventListener("click", () => {
  setActive(allBtn, allIssuesCardContainer);
});

openBtn.addEventListener("click", () => {
  setActive(openBtn, openIssuesCardContainer);
});

closedBtn.addEventListener("click", () => {
  setActive(closedBtn, closedIssuesCardContainer);
});

loadClosedIssues();
loadAllIssues();
loadOpenIssues();
setActive(allBtn, allIssuesCardContainer);
