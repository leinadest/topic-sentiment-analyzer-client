import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

type AnalyzeParams = {
  query: string;
};

export const Route = createFileRoute('/analyze')({
  component: Analyze,
  validateSearch: (search: Record<string, unknown>): AnalyzeParams => {
    return { query: search.query as string };
  },
});

function Analyze() {
  const { query: queryParam } = Route.useSearch();
  const [query, setQuery] = useState(queryParam);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query') as string;
    setQuery(query);
  }

  return (
    <div className="flex flex-col self-center w-full max-w-screen-xl">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center"
      >
        <input
          type="text"
          name="query"
          placeholder="Search"
          className="m-4 w-full"
        />
        <button>Enter</button>
      </form>

      <main>
        <h1 className="text-center">{query}</h1>
      </main>
    </div>
  );
}
