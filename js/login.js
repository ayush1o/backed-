document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const identifierInput = document.getElementById('identifier');
  const passwordInput = document.getElementById('password');

  if (!loginForm || !identifierInput || !passwordInput) return;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const { ok, data } = await window.DemoApi.post('/api/auth/login', {
      identifier: identifierInput.value,
      password: passwordInput.value
    });

    if (ok && data.success) {
      localStorage.setItem('demoAuthenticated', 'true');
      localStorage.setItem('demoDisplayName', data.user?.name || 'Demo User');
      window.location.href = 'dashboard.html';
    } else {
      alert(data.message || 'Login failed');
    }

    loginForm.reset();
  });
});
