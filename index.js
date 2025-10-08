function replayLobbyAnimation() {
  const lobbyRoot =
    document.getElementById('SettingLobby') ||
    document.querySelector('.SettingLobby') ||
    document;

  const scope =
    lobbyRoot.querySelector('.LeftPartSettingMenu') || lobbyRoot;

  const targets = scope.querySelectorAll('.input-container, .FriendlyFireDiv');
  if (!targets.length) return;

  gsap.killTweensOf(targets);
  gsap.set(targets, { opacity: 0 });

  requestAnimationFrame(() => {
    gsap.to(targets, {
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power1.out',
      overwrite: 'auto'
    });
  });
}

function replayLeaderBoardAnimation() {
  const boardRoot =
    document.getElementById('LeaderBoardPage') ||
    document.querySelector('.LeaderBoardPage') ||
    document;

  const targets = boardRoot.querySelectorAll('.PlayerBoxLeaderBoard');
  if (!targets.length) return;

  gsap.killTweensOf(targets);
  gsap.set(targets, { opacity: 0 });

  requestAnimationFrame(() => {
    gsap.to(targets, {
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power1.out',
      overwrite: 'auto'
    });
  });
}

function pageHandler(page) {
  const pages = ['homepage', 'SettingLobby', 'LeaderBoardPage', 'LobbysPage'];

  pages.forEach(p => {
    const el = document.getElementById(p) || document.querySelector('.' + p);
    if (!el) return;

    if (p === page) {
      el.style.display = 'flex';

      if (p === 'SettingLobby') {
        replayLobbyAnimation();
      } else if (p === 'LeaderBoardPage') {
        replayLeaderBoardAnimation();
      }

    } else {
      el.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const isOpen =
    (document.getElementById('SettingLobby') || document.querySelector('.SettingLobby'));
  if (isOpen && getComputedStyle(isOpen).display !== 'none') {
    replayLobbyAnimation();
  }
});

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
  const FADE_TIME = 300; 

  function setTextWithFade(newText) {
    if (privateText.textContent === newText) return; 
    privateText.classList.add("fading");             
    setTimeout(() => {
      privateText.textContent = newText;            
      privateText.classList.remove("fading");        
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
  let val = numberSpan.innerText.replace(/\D/g, "");
  if (val === "") val = "0";
  numberSpan.innerText = formatNumber(val);
  placeCaretAtEnd(numberSpan);
});

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

document.querySelectorAll(".input-container").forEach(container => {
  const numberSpan = container.querySelector(".only-number"); 
  const whiteLine = container.querySelector(".WhitlineBottomInput");

  if (numberSpan) {
    numberSpan.addEventListener("focus", () => {
      container.classList.add("active");
      if (whiteLine) whiteLine.style.transform = "translateX(60px)";
    });

    numberSpan.addEventListener("blur", () => {
      container.classList.remove("active");
      if (whiteLine) whiteLine.style.transform = "translateX(0px)";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const firstElement = document.querySelector('.toppartmodal');
  if (firstElement) {
    firstElement.style.setProperty('--animate-delay', '0.2s');
    firstElement.style.animationDelay = '0.2s';
  }

  function setDelay(className, delay) {
    const elements = document.querySelectorAll(className);
    elements.forEach(element => {
      element.style.setProperty('--animate-delay', delay);
      element.style.animationDelay = delay;
    });
  }

  setDelay('.anim1', '0.2s');
  setDelay('.anim2', '0.3s');
  setDelay('.anim3', '0.4s');
  setDelay('.anim4', '0.5s');
  setDelay('.anim5', '0.6s');
  setDelay('.anim6', '0.7s');
  setDelay('.anim7', '0.8s');
  setDelay('.anim8', '0.9s');
  setDelay('.anim9', '1s');
  setDelay('.anim7', '1.1s');
});

function openModal(modal) {
  if (!modal) return;
  modal.classList.remove("is-closing");
  modal.style.display = "flex";
  requestAnimationFrame(() => {
    modal.classList.add("is-open");
  });
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.classList.add("is-closing");

  modal.addEventListener("animationend", function handler() {
    modal.style.display = "none";
    modal.classList.remove("is-closing");
    modal.removeEventListener("animationend", handler);
  });
}

document.querySelectorAll("[data-modal-target]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.modalTarget);
    openModal(target);
  });
});

document.querySelectorAll(".modal .close").forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    const modal = closeBtn.closest(".modal");
    closeModal(modal);
  });
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    closeModal(e.target);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.is-open").forEach(m => closeModal(m));
  }
});

document.querySelectorAll('.SteamPlayerNameSteam').forEach(el => {
  const text = el.textContent.trim();
  if (text.length > 23) {
    el.textContent = text.substring(0, 23) + '..';
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const rooms = document.querySelectorAll(".RoomBoxDiv");

  // Set first one active
  if (rooms.length > 0) rooms[0].classList.add("active");

  rooms.forEach(room => {
    room.addEventListener("mouseenter", () => {
      rooms.forEach(r => r.classList.remove("active"));
      room.classList.add("active");
    });
  });
});


document.querySelectorAll(".input-containerPassword").forEach(container => {
  const input = container.querySelector("input");

  if (!input) return;

  const DEFAULT = "Password";

  input.addEventListener("focus", () => {
    if (input.value === DEFAULT) {
      input.value = "";
    }
  });

  input.addEventListener("input", () => {
    // Just handle password logic, no span updates
    // You can still add any custom logic here if needed
  });

  input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
      input.value = DEFAULT;
    }
  });
});
