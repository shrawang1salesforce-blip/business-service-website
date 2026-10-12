const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const year = document.querySelector("#year");
const reviewTrack = document.querySelector(".review-track");
const trackFilters = document.querySelector(".track-filters");
const trackCards = [...document.querySelectorAll(".domain-card")];
const trackCount = document.querySelector("#track-count");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton && siteNav) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      menuButton.getAttribute("aria-expanded") === "true" &&
      !siteNav.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });
}

if (reviewTrack) {
  document.querySelectorAll("[data-review-step]").forEach((button) => {
    button.addEventListener("click", () => {
      const direction = Number(button.dataset.reviewStep);
      const card = reviewTrack.querySelector(".review-card");

      if (!card) {
        return;
      }

      const styles = getComputedStyle(reviewTrack);
      const gap = Number.parseFloat(styles.columnGap) || 0;
      reviewTrack.scrollBy({
        left: direction * (card.getBoundingClientRect().width + gap),
        behavior: "smooth",
      });
    });
  });
}

if (trackFilters && trackCards.length && trackCount) {
  trackFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-track-filter]");

    if (!button) {
      return;
    }

    const selectedCategory = button.dataset.trackFilter;
    let visibleCount = 0;

    trackFilters.querySelectorAll("[data-track-filter]").forEach((filter) => {
      const isActive = filter === button;
      filter.classList.toggle("is-active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });

    trackCards.forEach((card) => {
      const isVisible =
        selectedCategory === "all" || card.dataset.category === selectedCategory;

      card.hidden = !isVisible;
      visibleCount += Number(isVisible);
    });

    trackCount.textContent =
      selectedCategory === "all"
        ? `Showing all ${visibleCount} tracks`
        : `Showing ${visibleCount} ${selectedCategory} tracks`;
  });
}
