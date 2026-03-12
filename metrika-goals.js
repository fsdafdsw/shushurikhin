(function () {
  var COUNTER_ID = 107279332;

  var goalSelectors = [
    { goal: "contact_email_click", test: function (link, href) { return href.indexOf("mailto:") === 0; } },
    { goal: "contact_telegram_click", test: function (link, href) { return href.indexOf("https://t.me/shushurikhin") === 0; } },
    { goal: "language_switch_click", test: function (link) { return link.lang === "en" || link.lang === "ru"; } },
    { goal: "portfolio_archive_click", test: function (link, href) { return href.indexOf("three-tarn-dcc.notion.site") !== -1 || href.indexOf("www.notion.so/ba65b55aa0a44eb7aa3c807c945e8ffd") !== -1; } },
    { goal: "service_page_click", test: function (link) { return Boolean(link.closest(".routes-grid, .related-grid")); } },
    { goal: "selected_work_click", test: function (link) { return Boolean(link.closest(".work-list, .examples-grid")); } },
    { goal: "supporting_material_click", test: function (link) { return Boolean(link.closest(".archive-grid")); } }
  ];

  function resolveGoal(link) {
    var href = link.href || "";
    for (var i = 0; i < goalSelectors.length; i += 1) {
      if (goalSelectors[i].test(link, href)) {
        return goalSelectors[i].goal;
      }
    }
    return null;
  }

  function sendGoal(goal, link) {
    if (typeof window.ym !== "function") {
      return;
    }

    var text = (link.textContent || "").replace(/\s+/g, " ").trim();
    window.ym(COUNTER_ID, "reachGoal", goal, {
      link_url: link.href || "",
      link_text: text.slice(0, 120),
      page_path: window.location.pathname
    });
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a");
    if (!link) {
      return;
    }

    var goal = resolveGoal(link);
    if (!goal) {
      return;
    }

    sendGoal(goal, link);
  }, true);
})();
