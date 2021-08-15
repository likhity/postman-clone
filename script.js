// import axios from "axios";

const urlTextField = document.querySelector(".url-text-field");

urlTextField.addEventListener("input", (e) => {
  if (e.target.value) {
    document.title = urlTextField.value;
  } else {
    document.title = "Postman Clone";
  }
});

const navTabsElements = document.querySelectorAll(".nav li");

class TabObserver {
  constructor(tab) {
    this.tab = tab;
    this.tabPane = document.querySelector(".tabPane.selected");
  }

  setTab(tab) {
    this.tab.classList.remove("selected");
    tab.classList.add("selected");
    this.tabPane.classList.remove("selected");
    const tabPaneToBeSelected = document.querySelector(
      `.tabPane.${tab.textContent.toLowerCase()}`
    );
    tabPaneToBeSelected.classList.add("selected");
    this.tabPane = tabPaneToBeSelected;
    this.tab = tab;
  }
}

const tabObserver = new TabObserver(navTabsElements[0]);

navTabsElements.forEach((navTabElement) => {
  navTabElement.addEventListener("click", (e) => {
    if (navTabElement.classList.contains("selected")) return;
    tabObserver.setTab(navTabElement);
  });
});
