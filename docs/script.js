// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navList = document.querySelector('nav ul');

navToggle.addEventListener('click', () => {
  navList.classList.toggle('show');
});

// Carousel functionality
const projectList = document.querySelector('.project-list');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const projects = document.querySelectorAll('.project');

// Calculate the width of a single project item including its margin/gap
// Assuming gap is 1rem (16px) and project width is 100% of container minus some padding.
// We can get the clientWidth of the first project and add the gap.
let projectWidth = projects[0].clientWidth + 16; // Assuming 1rem = 16px gap

leftArrow.addEventListener('click', () => {
  projectList.scrollBy({ left: -projectWidth, behavior: 'smooth' });
});

rightArrow.addEventListener('click', () => {
  projectList.scrollBy({ left: projectWidth, behavior: 'smooth' });
});

// Project search functionality
const projectSearchInput = document.getElementById('project-search-input');
const projectSearchClear = document.getElementById('project-search-clear');
projectSearchClear.addEventListener('click',() => {
  projectSearchInput.value = '';
  // Trigger the input event to re-filter and show all projects
  projectSearchInput.dispatchEvent(new Event('input'));
});

projectSearchInput.addEventListener('input', (event) => {
  const searchQuery = event.target.value.toLowerCase();
  let visibleCount = 0;
  const noProjectsMessage = document.getElementById('no-projects-message'); // Select message by ID

  projects.forEach(project => {
    const keywords = project.getAttribute('data-keywords') || '';
    const title = project.querySelector('h3').textContent.toLowerCase();
    const description = project.querySelector('p').textContent.toLowerCase();

    // Check if search query matches keywords, title, or description
    if (keywords.includes(searchQuery) || title.includes(searchQuery) || description.includes(searchQuery)) {
      project.style.display = 'block'; // Show the project
      visibleCount++;
    } else {
      project.style.display = 'none'; // Hide the project
    }
  });

  // Show or hide the "No projects found" message based on visible projects
  if (noProjectsMessage) {
    if (visibleCount === 0) {
      noProjectsMessage.style.display = 'block';
      // Optionally hide arrows if no projects are visible after search
      leftArrow.style.display = 'none';
      rightArrow.style.display = 'none';
    } else {
      noProjectsMessage.style.display = 'none';
      // Show arrows again if projects become visible
      leftArrow.style.display = ''; // Reset to default display
      rightArrow.style.display = ''; // Reset to default display
    }
  }

  // Re-calculate projectWidth in case of dynamic changes (though less likely with current CSS)
  // If the layout could change significantly, recalculating here might be needed.
  // For this specific case, with projects taking 100% width, clientWidth is likely the carousel-container width minus padding.
  // Let's stick to the initial calculation for simplicity, assuming layout is stable after load.
});

// Optional: Recalculate projectWidth on window resize if the layout is responsive
window.addEventListener('resize', () => {
    if (projects.length > 0) {
        projectWidth = projects[0].clientWidth + 16; // Re-calculate with gap
    }
});

