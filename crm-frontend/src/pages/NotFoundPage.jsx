import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="flex min-h-[70vh] items-center justify-center">
        <Card className="w-full max-w-lg p-10 text-center">
          <p className="text-sm font-medium text-slate-500">404</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Page not found</h1>
          <p className="mt-2 text-sm text-slate-500">The page you are trying to access does not exist.</p>
          <Button className="mt-6" onClick={() => navigate('/')}>
            Go to Dashboard
          </Button>
        </Card>
      </div>
    </MainLayout>
  );
};
