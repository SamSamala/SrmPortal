import { useState, useEffect } from 'react';
import Landing from './Landing';
import Dashboard from './Dashboard';
import { getDayOrder } from './Dashboard';

export default function App() {
  const [dark, setDark] = useState(false);
  const [view,        setView]        = useState('loading');
  const [email,       setEmail]       = useState('');
  const [pass,        setPass]        = useState('');
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');
  const [data,        setData]        = useState(null);
  const [capImg,      setCapImg]      = useState('');
  const [capSol,      setCapSol]      = useState('');
  const [sessId,      setSessId]      = useState('');
  const [savedToken,  setSavedToken]  = useState('');
  const [showPass,    setShowPass]    = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  // On mount: check for saved session
  useEffect(() => {
    const token      = localStorage.getItem('srm_session_token');
    const savedEmail = localStorage.getItem('srm_session_email');

    if (token && savedEmail) {
      setSavedToken(token);
      setEmail(savedEmail);
      autoLogin(savedEmail, token);
    } else {
      setView('landing');
    }
  }, []);

  // Auto-login with saved session token
  async function autoLogin(emailArg, token) {
    try {
      setLoading(true);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 270000);

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailArg, password: null, sessionToken: token }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const json = await res.json();

      if (res.ok && json.data && !json.needsCaptcha) {
        setData(json.data);
        setView('dashboard');
      } else if (res.status === 401 || json.error === 'session_expired') {
        localStorage.removeItem('srm_session_token');
        localStorage.removeItem('srm_session_email');
        setSavedToken('');
        setView('login');
      } else {
        setView('landing');
      }
    } catch (e) {
      setView('landing');
    } finally {
      setLoading(false);
    }
  }

  // Manual login
  async function handleLogin(e) {
    e?.preventDefault();
    if (!email || !pass) { setError('Enter email and password.'); return; }
    setError('');
    setLoading(true);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 270000);

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Login failed');

      if (json.needsCaptcha) {
        setCapImg(json.captchaImage);
        setSessId(json.sessionId);
        setView('captcha');
      } else {
        if (json.sessionToken) {
          localStorage.setItem('srm_session_token', json.sessionToken);
          localStorage.setItem('srm_session_email', email);
          setSavedToken(json.sessionToken);
        }
        setData(json.data);
        setView('dashboard');
      }
    } catch (err) {
      if (err.name === 'AbortError') setError('Request timed out. SRM portal may be down. Please try again.');
      else setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // CAPTCHA solve
  async function handleCaptcha(e) {
    e?.preventDefault();
    if (!capSol) { setError('Enter CAPTCHA text.'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessId, solution: capSol }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'CAPTCHA failed');

      if (json.needsCaptcha) {
        setCapImg(json.captchaImage);
        setCapSol('');
        setError('Wrong CAPTCHA. Try again.');
      } else {
        if (json.sessionToken) {
          localStorage.setItem('srm_session_token', json.sessionToken);
          localStorage.setItem('srm_session_email', email);
          setSavedToken(json.sessionToken);
        }
        setData(json.data);
        setView('dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Logout
  async function logout() {
    localStorage.removeItem('srm_session_token');
    localStorage.removeItem('srm_session_email');
    setSavedToken('');
    try {
      await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch (e) {}
    setData(null);
    setEmail('');
    setPass('');
    setView('landing');
  }

  const shared = {
    dark, setDark,
    view, setView,
    data, setData,
    email, setEmail,
    pass, setPass,
    loading, setLoading,
    error, setError,
    capImg, setCapImg,
    capSol, setCapSol,
    sessId, setSessId,
    savedToken, setSavedToken,
    showPass, setShowPass,
    dataLoading, setDataLoading,
    handleLogin, handleCaptcha, logout,
  };

  // Checking session (instant — only shows during useEffect)
  if (view === 'loading') return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: dark ? '#04060d' : '#f5f0e8',
      color: dark ? '#eef2ff' : '#1a1510',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontSize: 13,
      gap: 10,
    }}>
      <div style={{
        width: 16, height: 16, borderRadius: '50%',
        border: '2px solid rgba(79,141,255,.3)',
        borderTopColor: '#4f8dff',
        animation: 'spin .7s linear infinite',
      }}/>
      Checking session...
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  // Landing page
  if (view === 'landing') return (
    <Landing
      onLogin={() => setView('login')}
      dark={dark}
      setDark={setDark}
    />
  );

  // Everything else (login, captcha, dashboard) handled inside Dashboard
  return <Dashboard {...shared} />;
}