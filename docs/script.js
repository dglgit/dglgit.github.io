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
  if (projectList.scrollLeft <= 0) {
    // At the beginning, jump to the end
    projectList.scrollLeft = projectList.scrollWidth - projectList.clientWidth;
  } else {
    // Scroll left normally
    projectList.scrollBy({ left: -projectWidth, behavior: 'smooth' });
  }
});

rightArrow.addEventListener('click', () => {
  // Check if we are at or near the end of the scroll
  if (projectList.scrollLeft + projectList.clientWidth >= projectList.scrollWidth) {
    // At the end, jump to the beginning
    projectList.scrollLeft = 0;
  } else {
    // Scroll right normally
    projectList.scrollBy({ left: projectWidth, behavior: 'smooth' });
  }
});

// Project dropdown functionality
const projectDropdown = document.getElementById('project-dropdown');

projectDropdown.addEventListener('change', () => {
  const selectedProject = projectDropdown.value;


  projects.forEach(project => {
    const title = project.querySelector('h3').textContent;

    if (title === selectedProject) {
      // Scroll to the selected project
      projectList.scrollLeft = project.offsetLeft - projectList.offsetLeft;
    }
  });


  // Update project counter after dropdown change
  updateProjectCounter();
});
// Get the counter element
const remainingProjectsCounter = document.getElementById('remaining-projects-counter');

// Function to update the project counter
function updateProjectCounter() {
  const visibleProjects = Array.from(projects).filter(project => project.style.display !== 'none');
  const totalVisibleProjects = visibleProjects.length;

  if (totalVisibleProjects === 0) {
    remainingProjectsCounter.textContent = '';
    return;
  }

  let mostVisibleProjectIndex = -1;
  let minDistanceToCenter = Infinity;

  const scrollCenter = projectList.scrollLeft + projectList.clientWidth / 2;

  visibleProjects.forEach((project, index) => {
    const projectCenter = project.offsetLeft - projectList.offsetLeft + project.clientWidth / 2;
    const distance = Math.abs(projectCenter - scrollCenter);

    if (distance < minDistanceToCenter) {
      minDistanceToCenter = distance;
      mostVisibleProjectIndex = index;
    }
  });

  if (mostVisibleProjectIndex !== -1) {
    // Display the current project number out of the total visible projects
    remainingProjectsCounter.textContent = `Project ${mostVisibleProjectIndex + 1} of ${totalVisibleProjects}`;
  } else {
    // This case should ideally not happen if totalVisibleProjects > 0
    remainingProjectsCounter.textContent = '';
  }
}

// Update counter on scroll
projectList.addEventListener('scroll', updateProjectCounter);

// Optional: Recalculate projectWidth on window resize if the layout is responsive
window.addEventListener('resize', () => {
    if (projects.length > 0) {
        projectWidth = projects[0].clientWidth + 16; // Re-calculate with gap
        // Update counter as visible projects might change on resize
        updateProjectCounter();
    }
});

// Get the layout toggle button and carousel container
const layoutToggleButton = document.getElementById('layout-toggle-button');
const carouselContainer = document.querySelector('.carousel-container');
const projectCounter = document.querySelector('.project-counter');

// Add event listener to the toggle button
layoutToggleButton.addEventListener('click', () => {
  const isStacked = projectList.classList.contains('stacked');

  if (isStacked) {
    // Switch back to carousel view
    projectList.classList.remove('stacked');
    carouselContainer.classList.remove('stacked'); // Remove class from container too if needed for arrow display
    leftArrow.style.display = ''; // Show arrows
    rightArrow.style.display = '';
    layoutToggleButton.textContent = 'Show Stacked';
    projectCounter.style.display = ''; // Show counter
    // Optional: Reset scroll position to the beginning when returning to carousel view
    projectList.scrollLeft = 0;
  } else {
    // Switch to stacked view
    projectList.classList.add('stacked');
    carouselContainer.classList.add('stacked'); // Add class to container too if needed for arrow display
    leftArrow.style.display = 'none'; // Hide arrows
    rightArrow.style.display = 'none';
    layoutToggleButton.textContent = 'Show Carousel';
    projectCounter.style.display = 'none'; // Hide counter
  }

  // Update counter visibility or logic based on the new layout if necessary
  // For now, the updateProjectCounter function handles visible projects correctly regardless of layout.
  updateProjectCounter();
});

// Initial counter update on page load
updateProjectCounter();