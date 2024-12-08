import { createFileRoute, useRouter } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query') as string;
    if (query) {
      router.navigate({ to: '/analyze', search: { query } });
    }
  }

  return (
    <div className="m-auto *:mb-4 max-w-4xl first:text-center">
      <h1 className="text-5xl sm:text-7xl">Topic Sentiment Analyzer</h1>
      <p className="sm:text-3xl text-textSecondary">
        Input below a common term or phrase and see how social media feels about
        it!
      </p>
      <form onSubmit={handleSubmit} className="mt-8 text-xl sm:text-3xl">
        <input
          type="text"
          name="query"
          placeholder="Type here..."
          className="m-4"
        />
        <button>Analyze</button>
      </form>
    </div>
  );
}
