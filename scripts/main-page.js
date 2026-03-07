const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const issuesCardContainer = document.getElementById("issues-card-container");
const allUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const setActive = (id) => {
  btns = [allBtn, openBtn, closedBtn];
  for (btn of btns) {
    btn.classList.remove("btn-primary");
    if (id === btn) {
      id.classList.add("btn-primary");
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
  console.log(arr);
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
          <span class="bg-red-100 text-red-600 py-1 px-4 rounded-2xl">
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
    issuesCardContainer.appendChild(card);
  });
};

loadAllIssues();
setActive(allBtn);
