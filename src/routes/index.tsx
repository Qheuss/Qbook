import { createFileRoute } from '@tanstack/react-router';
import Feed from '../components/Qbook/Feed';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div>
      <Feed />
    </div>
  );
}
