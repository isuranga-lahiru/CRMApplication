import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-xl p-10 text-center">
          <div className="mb-4 text-6xl">404</div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Page Not Found</h1>
          <p className="mb-6 text-slate-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button onClick={() => navigate('/')}>Go to Dashboard</Button>
        </Card>
      </div>
    </MainLayout>
  );
};
