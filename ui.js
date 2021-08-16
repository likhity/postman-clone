export const urlTextField = document.querySelector(".url-text-field");
export const formElement = document.querySelector("form.form");
export const bodyElement = document.querySelector("#body");
export const responseElement = document.querySelector(".response-textarea");
export const tabPanes = document.querySelectorAll(".tabPane");

urlTextField.addEventListener("input", (e) => {
  if (e.target.value) {
    document.title = urlTextField.value;
  } else {
    document.title = "Postman Clone";
  }
});

export const navTabsElements = document.querySelectorAll(".nav li");

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

export const tabObserver = new TabObserver(navTabsElements[0]);

navTabsElements.forEach((navTabElement) => {
  navTabElement.addEventListener("click", (e) => {
    if (navTabElement.classList.contains("selected")) return;
    tabObserver.setTab(navTabElement);
  });
});

export const createKeyValuePairElements = document.querySelectorAll("#create");

createKeyValuePairElements.forEach((createKeyValuePairElement) => {
  createKeyValuePairElement.addEventListener("click", () => {
    const parentElementClassSelector =
      "." +
      createKeyValuePairElement.parentElement.className.split(" ").join(".");
    createKeyValuePair(parentElementClassSelector);
    createKeyValuePairElement.style.setProperty("display", "none");
  });
});

export function createKeyValuePair(parentSelector) {
  /** @type {HTMLDivElement} */
  const parentElement = document.querySelector(parentSelector);
  const keyValuePairDiv = document.createElement("form");
  keyValuePairDiv.classList.add("key-value-pair");
  const keyInput = document.createElement("input");
  keyInput.type = "text";
  keyInput.classList.add("key");
  keyInput.id, (keyInput.name = "key");
  keyInput.placeholder = "Key";
  const valueInput = document.createElement("input");
  valueInput.type = "text";
  valueInput.classList.add("value");
  valueInput.id, (valueInput.name = "value");
  valueInput.placeholder = "Value";
  keyInput.addEventListener("keydown", (e) => {
    if (e.code.toLowerCase().includes("enter")) {
      e.preventDefault();
      valueInput.focus();
    }
  });
  valueInput.addEventListener("keydown", (e) => {
    if (e.code.toLowerCase().includes("enter")) {
      e.preventDefault();
      createKeyValuePair(parentSelector);
    }
    if (e.code === "Backspace" && !valueInput.value.length) {
      keyInput.focus();
    }
  });
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = "&times;";
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    keyValuePairDiv.remove();
    if (!(parentElement.children.length > 1)) {
      parentElement
        .querySelector("#create")
        .style.setProperty("display", "inline");
    }
  });
  keyValuePairDiv.append(keyInput, valueInput, deleteBtn);
  parentElement.append(keyValuePairDiv);
  keyInput.focus();
}

bodyElement.onkeydown = (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    insertAtCursor(bodyElement, "  ");
  }
};

export function getKeyValuePairData(selector) {
  const tabPane = document.querySelector(selector);
  const keyValuePairData = {};
  const keyValuePairs = tabPane.querySelectorAll(".key-value-pair");
  if (keyValuePairs.length) {
    keyValuePairs.forEach((keyValuePair) => {
      keyValuePairData[keyValuePair.key.value] = keyValuePair.value.value;
    });
  }
  return keyValuePairData;
}

function insertAtCursor(myField, myValue) {
  //IE support
  if (document.selection) {
    myField.focus();
    sel = document.selection.createRange();
    sel.text = myValue;
  }
  //MOZILLA and others
  else if (myField.selectionStart || myField.selectionStart == "0") {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;
    myField.value =
      myField.value.substring(0, startPos) +
      myValue +
      myField.value.substring(endPos, myField.value.length);
  } else {
    myField.value += myValue;
  }
}
