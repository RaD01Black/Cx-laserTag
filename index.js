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

    input.addEventListener("focus", () => {
      container.classList.add("active");
      whiteLine.style.transform = "translateX(60px)";
    });

    input.addEventListener("blur", () => {
      container.classList.remove("active");
      whiteLine.style.transform = "translateX(0px)";
    });
  });
  document.querySelectorAll(".input-container.dropdown").forEach(container => {
    const input     = container.querySelector("input");
    const whiteLine = container.querySelector(".WhitlineBottomInput");
    const menu      = container.querySelector(".dropdown-menu");

    // open/close on clicking the whole div
    container.addEventListener("click", () => {
      container.classList.toggle("open");
    });

    // select option
    menu.querySelectorAll("li").forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        input.value = item.dataset.value;
        container.classList.remove("open");
      });
    });

    // close if click outside
    document.addEventListener("click", (e) => {
      if (!container.contains(e.target)) {
        container.classList.remove("open");
      }
    });

    // scale + white line on focus/blur
    input.addEventListener("focus", () => {
      container.classList.add("active");
      whiteLine.style.transform = "translateX(50px)";
    });
    input.addEventListener("blur", () => {
      container.classList.remove("active");
      whiteLine.style.transform = "translateX(0px)";
    });
  });