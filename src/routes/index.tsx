import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="m-auto *:mb-4 max-w-4xl first:text-center">
      <h1 className="text-5xl sm:text-7xl">Topic Sentiment Analyzer</h1>
      <p className="sm:text-3xl text-textSecondary">
        Input below a common term or phrase and see how social media feels about
        it!
      </p>
      <div className="mt-8 text-xl sm:text-3xl">
        <input type="text" placeholder="Type here..." className="m-4" />
        <button>Analyze</button>
      </div>
    </div>
  );
}