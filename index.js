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
      whiteLine.style.transform = "translateX(50px)";
    });

    input.addEventListener("blur", () => {
      container.classList.remove("active");
      whiteLine.style.transform = "translateX(0px)";
    });
  });