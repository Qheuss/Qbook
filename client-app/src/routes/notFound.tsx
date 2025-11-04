import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/notFound')({
  component: Index,
});

function Index() {
  return (
    <div className='flex items-center justify-center h-screen text-4xl text-white'>
      <h1>404</h1>
    </div>
  );
}
