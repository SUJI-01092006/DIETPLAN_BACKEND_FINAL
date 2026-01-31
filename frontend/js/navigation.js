function setActive(page) {
  document.querySelectorAll(".sidebar a").forEach(link => {
    if (link.dataset.page === page) {
      link.classList.add("active");
    }
  });
}
