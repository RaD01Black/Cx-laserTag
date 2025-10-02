function pageHandler(page) {
  let pages = ["homepage", "SettingLobby", "adminPlan"];

  pages.forEach(p => {
    document.getElementById(p).style.display = (p === page) ? "flex" : "none";
  });
}

const mapDivs = document.querySelectorAll(".MapSelectDiv");

mapDivs.forEach((div, i) => {
  const green = div.querySelector(".GreenSelectMap");
  const red = div.querySelector(".RedSelectMap");
  if (i === 0) {
    green.classList.add("active");
  } else {
    red.classList.add("active");
  }
});

mapDivs.forEach(div => {
  div.addEventListener("click", () => {
    mapDivs.forEach(d => {
      d.querySelector(".GreenSelectMap").classList.remove("active");
      d.querySelector(".RedSelectMap").classList.add("active");
    });

    div.querySelector(".GreenSelectMap").classList.add("active");
    div.querySelector(".RedSelectMap").classList.remove("active");
  });
});


document.querySelectorAll(".input-container").forEach(container => {
  const input = container.querySelector("input"); 
  const whiteLine = container.querySelector(".WhitlineBottomInput");

  if (input) { 
    input.addEventListener("focus", () => {
      container.classList.add("active");
      whiteLine.style.transform = "translateX(60px)";
    });

    input.addEventListener("blur", () => {
      container.classList.remove("active");
      whiteLine.style.transform = "translateX(0px)";
    });
  }
});


//  Dropdown 
document.querySelectorAll(".input-container.dropdown").forEach(container => {
  const selected  = container.querySelector(".selected-value");
  const menu      = container.querySelector(".dropdown-menu");
  const whiteLine = container.querySelector(".WhitlineBottomInput");
  const dropdownName = container.dataset.name;

  if (!selected || !menu) return;

  container.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".input-container.dropdown").forEach(c => c.classList.remove("open"));
    container.classList.add("open");
    if (whiteLine) whiteLine.style.transform = "translateX(50px)";
  });

  menu.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();

      selected.innerHTML = item.dataset.value;

      container.classList.remove("open");
      if (whiteLine) whiteLine.style.transform = "translateX(0px)";

      console.log(`${dropdownName} changed to: ${item.dataset.value}`); // inja log migire-----------------------------------------
    });
  });

  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
      container.classList.remove("open");
      if (whiteLine) whiteLine.style.transform = "translateX(0px)";
    }
  });
});

document.querySelectorAll(".input-container").forEach(container => {
  const input = container.querySelector("input");
  const privateText = container.querySelector(".privateLobbyText span");

  if (!input || !privateText) return;

  const DEFAULT = "Password";
  const FADE_TIME = 300; // must match CSS

  function setTextWithFade(newText) {
    if (privateText.textContent === newText) return; // avoid duplicate updates
    privateText.classList.add("fading");             // fade out
    setTimeout(() => {
      privateText.textContent = newText;             // swap text
      privateText.classList.remove("fading");        // fade back in
    }, FADE_TIME);
  }

  input.addEventListener("focus", () => {
    if (input.value === DEFAULT) {
      input.value = "";
    }
  });

  input.addEventListener("input", () => {
    if (input.value.trim() !== "" && input.value !== DEFAULT) {
      setTextWithFade("On");
    } else {
      setTextWithFade("Off");
    }
  });

  input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
      input.value = DEFAULT;
      setTextWithFade("Off");
    }
  });
});

document.querySelectorAll(".lobby-input").forEach(input => {
  const defaultValue = "CanXLobby";

  input.addEventListener("focus", () => {
    if (input.value === defaultValue) {
      input.value = "";
    }
  });

  input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
      input.value = defaultValue;
    }
  });
});

let isOn = true;

function toggleSwitch() {
  const onBox = document.getElementById("onBox");
  const offBox = document.getElementById("offBox");
  const onLabel = document.getElementById("onLabel");
  const offLabel = document.getElementById("offLabel");

  isOn = !isOn;

  if (isOn) {
    onBox.classList.add("active");
    offBox.classList.remove("active");
    onLabel.classList.add("active-label");
    onLabel.classList.remove("inactive-label");
    offLabel.classList.remove("active-label");
    offLabel.classList.add("inactive-label");

    logAction("Switched ON");
  } else {
    onBox.classList.remove("active");
    offBox.classList.add("active");
    onLabel.classList.remove("active-label");
    onLabel.classList.add("inactive-label");
    offLabel.classList.add("active-label");
    offLabel.classList.remove("inactive-label");

    logAction("Switched OFF");
  }
}

function logAction(action) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${action}`);
}

const numberSpan = document.querySelector(".only-number");

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

numberSpan.addEventListener("input", () => {
  // فقط رقم‌ها رو نگه داریم
  let val = numberSpan.innerText.replace(/\D/g, "");
  if (val === "") val = "0";
  numberSpan.innerText = formatNumber(val);
  placeCaretAtEnd(numberSpan);
});

// وقتی صفر هست و کاربر عدد جدید زد → صفر پاک بشه
numberSpan.addEventListener("keydown", (e) => {
  if (/^\d$/.test(e.key) && numberSpan.innerText === "0") {
    numberSpan.innerText = "";
  }
});

function placeCaretAtEnd(el) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
}