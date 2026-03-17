import { useState, useEffect } from 'react';
import Landing from './Landing';
import Dashboard from './Dashboard';
import { getDayOrder } from './Dashboard';

export default function App() {
  const [dark,        setDark]        = useState(false);
  const [view,        setView]        = useState('loading'); // starts as loading
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

  useEffect(() => {
    const token      = localStorage.getItem('srm_session_token');
    const savedEmail = localStorage.getItem('srm_session_email');

    if (token && savedEmail) {
      setSavedToken(token);
      setEmail(savedEmail);
      autoLogin(savedEmail, token);
    } else {
      // ✅ No token → go to landing immediately, don't stay on 'loading'
      setView('landing');
    }
  }, []);

  async function autoLogin(emailArg, token) {
    try {
      setLoading(true); // shows the LoginProgress spinner

      const controller = new AbortController();
      // ✅ 270s — just under Railway's 300s limit
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
        // ✅ Session expired — clear token, go to login (not logout which nukes everything)
        localStorage.removeItem('srm_session_token');
        localStorage.removeItem('srm_session_email');
        setSavedToken('');
        setView('login');
      } else {
        // Any other failure — just go to landing, keep token intact for retry
        setView('landing');
      }
    } catch (e) {
      // Network error / abort — don't clear session, just go to landing
      setView('landing');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e) {
    e?.preventDefault();
    if (!email || !pass) { setError('Enter email and password.'); return; }
    setError(''); setLoading(true);
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
        // ✅ Set data BEFORE view so dashboard renders with data immediately
        setData(json.data);
        setView('dashboard');
      }
    } catch (err) {
      if (err.name === 'AbortError') setError('Request timed out. SRM portal may be down. Please try again.');
      else setError(err.message);
    } finally {
      setLoading(false); // ✅ always clears
    }
  }

  async function handleCaptcha(e) {
    e?.preventDefault();
    if (!capSol) { setError('Enter CAPTCHA text.'); return; }
    setError(''); setLoading(true);
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
    dark, setDark, view, setView, data, setData,
    email, setEmail, pass, setPass,
    loading, setLoading, error, setError,
    capImg, setCapImg, capSol, setCapSol, sessId, setSessId,
    savedToken, setSavedToken, showPass, setShowPass,
    dataLoading, setDataLoading,
    handleLogin, handleCaptcha, logout,
  };

  // ✅ 'loading' view only shows while useEffect is running (instant)
  if (view === 'loading') return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg)'}}>Checking session...</div>;

  return <Dashboard {...shared} />;
}