const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

const setActive = (id) => {
  btns = [allBtn, openBtn, closedBtn];
  for (btn of btns) {
    btn.classList.remove("btn-primary");
    if (id === btn) {
      id.classList.add("btn-primary");
    }
  }
};

setActive(allBtn);
