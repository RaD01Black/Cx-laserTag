function pageHandler(page) {
  let pages = ["homepage", "SettingLobby", "adminPlan"];

  pages.forEach(p => {
      document.getElementById(p).style.display = (p === page) ? "flex" : "none";
  });
}