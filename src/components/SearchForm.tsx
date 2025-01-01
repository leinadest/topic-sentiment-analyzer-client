import { useRouter } from '@tanstack/react-router';
import { TimeFilter } from '../api/fetchAnalysis';

function SearchForm() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query') as string;
    const timeFilter = formData.get('timeFilter') as TimeFilter;
    if (query) {
      router.navigate({ to: '/analyze', search: { query, timeFilter } });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center flex-wrap gap-4"
    >
      <input type="text" name="query" placeholder="Search" />
      <select name="timeFilter">
        <option value="all">All Time</option>
        <option value="hour">Last Hour</option>
        <option value="day">Last 24 Hours</option>
        <option value="week">Last Week</option>
        <option value="month">Last Month</option>
        <option value="year">Last Year</option>
      </select>
      <button>Enter</button>
    </form>
  );
}

export default SearchForm;
