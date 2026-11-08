import axios from "axios";

// =============================================
//  Switch between MOCK and REAL backend here
//  Set USE_REAL_API = true once PHP is running
// =============================================
const USE_REAL_API = true; // ← change to true when XAMPP is ready

const API_BASE = "http://localhost/socialapp/api";

// ── MOCK (for demo when PHP not ready) ───────
import { MOCK_USERS } from "./mockData";

const fakeDelay = (ms = 500) => new Promise((res) => setTimeout(res, ms));

async function mockRegister(userdata) {
  await fakeDelay();
  const exists = MOCK_USERS.find((u) => u.email === userdata.email);
  if (exists) return { error: "Email already registered. Please log in." };
  return { message: "Account created successfully! Please log in." };
}

async function mockLogin(userdata) {
  await fakeDelay();
  const user = MOCK_USERS.find((u) => u.email === userdata.email) || MOCK_USERS[0];
  return {
    message: "Login successful!",
    token: "mock-token-" + user._id,
    user,
  };
}

// ── REAL API ──────────────────────────────────
async function realRegister(userdata) {
  try {
    const { data } = await axios.post(`${API_BASE}/auth/register`, userdata);
    return data;
  } catch (err) {
    return { error: err.response?.data?.error || "Registration failed. Try again." };
  }
}

async function realLogin(userdata) {
  try {
    const { data } = await axios.post(`${API_BASE}/auth/login`, userdata);
    return data;
  } catch (err) {
    return { error: err.response?.data?.error || "Login failed. Try again." };
  }
}

// ── EXPORTS (used by your pages) ─────────────
export async function sendRegesterData(userdata) {
  return USE_REAL_API ? realRegister(userdata) : mockRegister(userdata);
}

export async function sendLoginData(userdata) {
  return USE_REAL_API ? realLogin(userdata) : mockLogin(userdata);
}
