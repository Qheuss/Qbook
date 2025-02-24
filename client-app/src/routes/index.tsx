import { createFileRoute } from '@tanstack/react-router';
import Header from '../components/Header';
import Feed from '../components/Qbook/Feed';
import Footer from '../components/Footer';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div>
      <Header selectedPage={0} />
      <Feed />
      <Footer />
    </div>
  );
}
