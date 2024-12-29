import {
  createFileRoute,
  useRouter,
  getRouteApi,
} from '@tanstack/react-router';

import { fetchAnalysis, TimeFilter } from '../api/fetchAnalysis';
import SentimentPieChart from '../components/SentimentPieChart';

type AnalyzeParams = {
  query: string;
  timeFilter: TimeFilter;
};

export const Route = createFileRoute('/analyze')({
  component: Analyze,
  validateSearch: (search: Record<string, unknown>): AnalyzeParams => {
    return {
      query: search.query as string,
      timeFilter: search.timeFilter ? (search.timeFilter as TimeFilter) : 'all',
    };
  },
  loaderDeps: ({ search: { query } }) => ({ query }),
  loader: async ({ deps: { query } }) => fetchAnalysis(query, 'all'),
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error</div>,
});

function Analyze() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query') as string;
    router.navigate({ to: '/analyze', search: { query, timeFilter: 'month' } });
  }

  const routeApi = getRouteApi('/analyze');
  const { query, timeFilter } = routeApi.useSearch();
  const data = routeApi.useLoaderData();

  const comments = {
    happy: [] as string[],
    sad: [] as string[],
    angry: [] as string[],
    scared: [] as string[],
    neutral: [] as string[],
  };

  data.predictions.forEach((prediction, index) => {
    const comment = data.comments[index];
    comments[prediction].push(comment);
  });

  return (
    <div className="flex flex-col gap-8 self-center w-full max-w-screen-xl">
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
        <SentimentPieChart comments={comments} />
      </main>

      <section>
        <h2>Summary</h2>
        <ul>
          <li>
            <strong>Source</strong>: Reddit
          </li>
          <li>
            <strong>Time Period</strong>: {timeFilter}
          </li>
          <li>
            <strong>Posts</strong>: {data.submission_count}
          </li>
          <li>
            <strong>Comments</strong>: {data.comments.length}
          </li>
          {Object.entries(comments).map(([key, value]) => (
            <li key={key}>
              <strong>
                {key.charAt(0).toUpperCase() + key.slice(1)} Comments
              </strong>
              : {value.length}
            </li>
          ))}
        </ul>
      </section>

      {Object.entries(comments).map(([emotion, commentList]) => (
        <section key={emotion}>
          <h2>
            Sample {emotion.charAt(0).toUpperCase() + emotion.slice(1)} Comments
          </h2>
          <ul>
            {commentList.slice(0, 10).map((comment) => (
              <li key={comment}>
                {comment.slice(0, 200)}
                {comment.length > 200 ? '...' : ''}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
