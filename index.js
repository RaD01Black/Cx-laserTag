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

  // باز/بسته کردن
  container.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".input-container.dropdown").forEach(c => c.classList.remove("open"));
    container.classList.add("open");
    if (whiteLine) whiteLine.style.transform = "translateX(50px)";
  });

  // انتخاب آیتم
  menu.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();

      // مقدار انتخابی شامل HTML
      selected.innerHTML = item.dataset.value;

      container.classList.remove("open");
      if (whiteLine) whiteLine.style.transform = "translateX(0px)";

      // لاگ تغییرات
      console.log(`${dropdownName} changed to: ${item.dataset.value}`);
    });
  });

  // کلیک بیرون → بستن
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

  // فقط روی کانتینرهایی که این دوتا رو دارن کد اجرا بشه
  if (!input || !privateText) return;

  // فوکوس → اگه مقدار Password هست پاک بشه
  input.addEventListener("focus", () => {
    if (input.value === "Password") {
      input.value = "";
    }
  });

  // تغییر محتوا → وضعیت on/off
  input.addEventListener("input", () => {
    if (input.value.trim() !== "" && input.value !== "Password") {
      privateText.textContent = "on";
    } else {
      privateText.textContent = "off";
    }
  });

  // وقتی از input خارج بشه → اگه خالی بود برگرده به Password
  input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
      input.value = "Password";
      privateText.textContent = "off";
    }
  });
});

document.querySelectorAll(".lobby-input").forEach(input => {
  const defaultValue = "CanXLobby";

  input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
      input.value = defaultValue;
    }
  });
});