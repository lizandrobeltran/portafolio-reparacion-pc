/* Runs before first paint: applies the saved or system theme and flags JS support. */
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) { /* storage blocked */ }
  var dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", dark ? "dark" : "light");
  root.classList.add("js");
})();
