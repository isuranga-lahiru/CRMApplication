import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { AuthLayout } from '../layouts/AuthLayout';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading: authLoading, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    navigate('/', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="glass-strong space-y-8 border-white/35 p-8 shadow-2xl shadow-slate-950/25 sm:p-10">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-700/30">
            <FiLock size={22} />
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Astra CRM</p>
          <h1 className="mb-2 mt-2 text-3xl font-bold text-slate-900 ">Welcome Back</h1>
          <p className="text-slate-500">Sign in to continue to your sales command center.</p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <Button type="submit" className="w-full" disabled={loading || authLoading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="rounded-xl border border-blue-200/80 bg-blue-50/80 p-4">
          <p className="text-sm text-blue-900">
            <strong>Demo Credentials:</strong>
            <br />
            Email: admin@example.com
            <br />
            Password: password123
          </p>
        </div>
      </Card>
    </AuthLayout>
  );
};
