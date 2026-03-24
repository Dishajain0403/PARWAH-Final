function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
}

function handleLogout(e) {
  if (e) e.preventDefault();
  Auth.clearSession();
  const root = (window.PARWAH_CONFIG && window.PARWAH_CONFIG.root) || './';
  window.location.href = root + 'login.html';
}

/**
 * State Management Utility
 */
const State = {
  getJoined: () => JSON.parse(localStorage.getItem('parwah_joined') || '[]'),
  addJoined: (type, id) => {
    const joined = State.getJoined();
    if (!joined.includes(`${type}_${id}`)) {
      joined.push(`${type}_${id}`);
      localStorage.setItem('parwah_joined', JSON.stringify(joined));
    }
  },
  getProgress: () => JSON.parse(localStorage.getItem('parwah_progress') || '{}'),
  updateProgress: (courseId, lessonId) => {
    const progress = State.getProgress();
    if (!progress[courseId]) progress[courseId] = [];
    if (!progress[courseId].includes(lessonId)) {
      progress[courseId].push(lessonId);
      localStorage.setItem('parwah_progress', JSON.stringify(progress));
    }
  },
  getCourseProgress: (courseId) => {
    const progress = State.getProgress();
    const course = mockData.courses.find(c => c.id == courseId);
    if (!course || !progress[courseId]) return 0;
    return Math.round((progress[courseId].length / course.lessons.length) * 100);
  }
};

function renderSidebarProfile() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const user = Auth.getUser();
  if (!user) return;

  // Remove existing profile if any
  const existing = document.querySelector('.sidebar-profile');
  if (existing) existing.remove();

  const profileHTML = `
    <div class="sidebar-profile">
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
        <div class="initials-circle">
          ${UI.getInitials(user.name)}
        </div>
        <div style="overflow: hidden;">
          <p style="font-size: 0.875rem; font-weight: 600; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${user.name}</p>
          <p style="font-size: 0.75rem; color: var(--muted); margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${user.email}</p>
        </div>
      </div>
      <button onclick="handleLogout(event)" class="btn btn-ghost btn-sm btn-full" style="justify-content: flex-start; gap: 0.5rem; padding-left: 0;">
        <span>🚪</span> Logout
      </button>
    </div>
  `;
  sidebar.insertAdjacentHTML('beforeend', profileHTML);
}

function initDashboard() {
  const user = Auth.getUser();
  if (user) {
    // Update profile info
    const profileName = document.querySelector('.profile-info h1');
    renderSidebarProfile();
    // Dynamic sidebar profile is now handled inside renderSidebarProfile
    const profileDetail = document.querySelector('.profile-info p');
    const profileEmail = document.querySelector('.profile-contact span:first-child');
    const profileAvatar = document.querySelector('.profile-avatar');

    if (profileName) profileName.innerText = `Welcome back, ${user.name.split(' ')[0]} 👋`;
    if (profileDetail) profileDetail.textContent = `${user.class} • Section ${user.section} • ${user.school}`;
    if (profileEmail) profileEmail.innerText = `✉️ ${user.email}`;
    if (profileAvatar) profileAvatar.textContent = UI.getInitials(user.name) || '🧑‍🎓';
  }
}

/**
 * Centralized Action Handler
 */
function handleGlobalActions(e) {
  const target = e.target.closest('[data-action]');
  if (!target) return;

  e.preventDefault();
  const action = target.getAttribute('data-action');
  const id = target.getAttribute('data-id');

  console.log(`Action triggered: ${action} | ID: ${id}`);

  const root = (window.PARWAH_CONFIG && window.PARWAH_CONFIG.root) || './';
  const pagesPath = root + 'parwah-dashboard/pages/';

  switch (action) {
    case 'view_workshop':
      window.location.href = `${pagesPath}workshop-details.html?id=${id}`;
      break;
    case 'view_activity':
      window.location.href = `${pagesPath}activity-details.html?id=${id}`;
      break;
    case 'play_game':
      const gameUrls = {
        '1': 'breathing.html',
        '2': 'color-match.html',
        '3': 'gratitude.html',
        '4': 'memory.html'
      };
      window.location.href = `${pagesPath}games/${gameUrls[id]}`;
      break;
    case 'view_course':
      window.location.href = `${pagesPath}courses/course.html?id=${id}`;
      break;
    case 'view_announcement':
    case 'set_mood':
      UI.showAlert('body', `Mood recorded: ${id}. Keep shining!`, 'success');
      break;
    case 'start_checkin':
      window.location.href = `${pagesPath}checkin.html`;
      break;
    case 'join_workshop':
    case 'join_activity':
    case 'join_course':
      UI.setLoading(target, true, 'Joining...');
      setTimeout(() => {
        UI.setLoading(target, false);
        UI.showAlert('body', 'Successfully registered! This has been added to your profile.', 'success');
        State.addJoined(action.split('_')[1], id);
      }, 1000);
      break;
    case 'delete_item':
      if (confirm('Are you sure you want to remove this item?')) {
        const item = target.closest('.card, .workshop-item, .course-card');
        if (item) {
          item.style.opacity = '0.5';
          item.style.pointerEvents = 'none';
          UI.showAlert('body', 'Item removed successfully (UI only).', 'success');
          setTimeout(() => item.remove(), 500);
        }
      }
      break;
    case 'create_workshop':
      window.location.href = pagesPath + 'create-workshop.html';
      break;
    default:
      console.warn(`Unhandled action: ${action}`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    document.addEventListener('click', handleGlobalActions);
});
