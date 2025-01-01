import { createFileRoute } from '@tanstack/react-router';
import SearchForm from '../components/SearchForm';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="m-auto *:mb-4 max-w-4xl first:text-center">
      <h1>Topic Sentiment Analyzer</h1>
      <p className="text-textSecondary">
        Input below a common term or phrase and see how social media feels about
        it!
      </p>
      <SearchForm />
    </div>
  );
}
