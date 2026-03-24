// ===== PARWAH AUTH LOGIC =====

// If already logged in, redirect
if (Auth.isLoggedIn()) Auth.redirectToDashboard();

function showStep(stepId) {
  document.querySelectorAll('.step-form').forEach(f => f.classList.remove('active'));
  document.getElementById(stepId).classList.add('active');
  document.getElementById('alertContainer').innerHTML = '';
}

// ===== LOGIN =====
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const btn = document.querySelector('button[type="submit"]');

  UI.setLoading(btn, true, 'Signing in...');
  document.getElementById('alertContainer').innerHTML = '';

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    // Mock static credentials
    if (email === 'Parwahtest@gmail.com' && password === 'password') {
      const mockUser = {
        email: email,
        name: 'Pass',
        role: 'Student',
        school: 'Delhi Public School',
        class: 'X',
        section: 'B'
      };
      
      Auth.setSession('mock-jwt-token', 'Student', mockUser);
      UI.showAlert('#alertContainer', 'Login successful! Redirecting...', 'success');
      
      setTimeout(() => {
        Auth.redirectToDashboard();
      }, 1000);
    } else {
      UI.showAlert('#alertContainer', 'Invalid credentials. Please try again.', 'error');
    }
  } catch (err) {
    UI.showAlert('#alertContainer', 'An unexpected error occurred.', 'error');
  } finally {
    UI.setLoading(btn, false, 'Sign In →');
  }
}

// Add event listener to form
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Redirect if already logged in
    if (Auth.isLoggedIn() && window.location.pathname.includes('login.html')) {
        Auth.redirectToDashboard();
    }
});

// ===== FORGOT PASSWORD =====
let forgotEmail = '';
let otpToken = '';

async function handleRequestOTP(e) {
  e.preventDefault();
  const emailVal = document.getElementById('forgotEmail').value.trim();
  const btn = document.getElementById('otpRequestBtn');

  UI.setLoading(btn, true, 'Sending OTP...');
  try {
    const res = await api.post('/auth/forgot-password', { email: emailVal });
    if (res) {
      forgotEmail = emailVal;
      document.getElementById('otpEmailDisplay').textContent = emailVal;
      showStep('formVerifyOTP');
      UI.showAlert('#alertContainer', 'OTP sent! Please check your email.', 'success');
    }
  } catch (err) {
    UI.showAlert('#alertContainer', err.message || 'Could not send OTP. Check your email.', 'error');
  } finally {
    UI.setLoading(btn, false, 'Send OTP →');
  }
}

async function handleResendOTP() {
  try {
    await api.post('/auth/forgot-password', { email: forgotEmail });
    UI.showAlert('#alertContainer', 'OTP resent!', 'info');
  } catch (err) {
    UI.showAlert('#alertContainer', 'Could not resend OTP.', 'error');
  }
}

async function handleVerifyOTP(e) {
  e.preventDefault();
  const otp = document.getElementById('otpCode').value.trim();
  const btn = document.getElementById('otpVerifyBtn');

  UI.setLoading(btn, true, 'Verifying...');
  try {
    const res = await api.post('/auth/verify-otp', { email: forgotEmail, otp });
    if (res) {
      otpToken = res.data?.resetToken || otp;
      showStep('formResetPassword');
    }
  } catch (err) {
    UI.showAlert('#alertContainer', err.message || 'Invalid OTP. Please try again.', 'error');
  } finally {
    UI.setLoading(btn, false, 'Verify OTP →');
  }
}

async function handleResetPassword(e) {
  e.preventDefault();
  const newPass = document.getElementById('newPassword').value;
  const confirmPass = document.getElementById('confirmPassword').value;
  const btn = document.getElementById('resetBtn');

  if (newPass !== confirmPass) {
    UI.showAlert('#alertContainer', 'Passwords do not match.', 'error');
    return;
  }

  UI.setLoading(btn, true, 'Updating...');
  try {
    await api.post('/auth/reset-password', {
      email: forgotEmail,
      resetToken: otpToken,
      newPassword: newPass,
    });
    UI.showAlert('#alertContainer', 'Password updated! Redirecting to login...', 'success');
    setTimeout(() => showStep('formLogin'), 1500);
  } catch (err) {
    UI.showAlert('#alertContainer', err.message || 'Failed to reset password.', 'error');
  } finally {
    UI.setLoading(btn, false, 'Update Password →');
  }
}
