import {
  createFileRoute,
  getRouteApi,
  useRouter,
} from '@tanstack/react-router';

import { Analysis, fetchAnalysis, TimeFilter } from '../api/fetchAnalysis';
import SentimentPieChart from '../components/SentimentPieChart';
import SearchForm from '../components/SearchForm';

type AnalyzeParams = {
  query: string;
  timeFilter: TimeFilter;
};

export const Route = createFileRoute('/analyze')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): AnalyzeParams => ({
    query: search.query as string,
    timeFilter: search.timeFilter ? (search.timeFilter as TimeFilter) : 'all',
  }),
  loaderDeps: ({ search: { query, timeFilter } }) => ({ query, timeFilter }),
  loader: async ({ deps: { query, timeFilter } }) =>
    fetchAnalysis(query, timeFilter),
  pendingComponent: PendingComponent,
  errorComponent: ErrorComponent,
});

// Route components

function RouteComponent() {
  const routeApi = getRouteApi('/analyze');
  const { query, timeFilter } = routeApi.useSearch();
  const data = routeApi.useLoaderData();

  const comments = categorizeComments(data.predictions, data.comments);

  return (
    <div className="flex flex-col gap-8 self-center w-full max-w-screen-xl">
      <SearchForm />
      <main>
        <h1 className="text-center">{query}</h1>
        <SentimentPieChart comments={comments} />
      </main>
      <Summary data={data} comments={comments} timeFilter={timeFilter} />
      <CommentSections comments={comments} />
    </div>
  );
}

function PendingComponent() {
  return (
    <p className="m-auto text-textSecondary">
      Loading model...
      <br />
      Searching Reddit...
      <br />
      Analyzing comments...
    </p>
  );
}

function ErrorComponent() {
  const router = useRouter();

  function handleClick() {
    router.invalidate();
  }

  return (
    <div className="m-auto text-center">
      <h1 className="mb-4">Error</h1>
      <button onClick={handleClick}>Try again</button>
    </div>
  );
}

// Components

function Summary({
  data,
  comments,
  timeFilter,
}: {
  data: Analysis;
  comments: Record<string, string[]>;
  timeFilter: string;
}) {
  return (
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
            <strong>{capitalize(key)} Comments</strong>: {value.length}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CommentSections({ comments }: { comments: Record<string, string[]> }) {
  return (
    <>
      {Object.entries(comments).map(([emotion, commentList]) => (
        <section key={emotion}>
          <h2>Sample {capitalize(emotion)} Comments</h2>
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
    </>
  );
}

// Utilities

function categorizeComments(predictions: string[], comments: string[]) {
  const categorized = {
    happy: Array<string>(),
    sad: Array<string>(),
    angry: Array<string>(),
    scared: Array<string>(),
    neutral: Array<string>(),
  };

  predictions.forEach((prediction, index) => {
    const comment = comments[index];
    categorized[prediction as keyof typeof categorized].push(comment);
  });

  return categorized;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
