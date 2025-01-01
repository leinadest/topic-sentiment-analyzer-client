import {
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
} from 'recharts';

interface SentimentPieChartInput {
  comments: {
    happy: string[];
    sad: string[];
    angry: string[];
    scared: string[];
    neutral: string[];
  };
}

function SentimentPieChart({ comments }: SentimentPieChartInput) {
  const total =
    comments.happy.length +
    comments.sad.length +
    comments.angry.length +
    comments.scared.length +
    comments.neutral.length;

  const pieData = [
    {
      name: 'Happy',
      value: comments.happy.length,
      perc: `${Math.floor((comments.happy.length / total) * 100)}%`,
      fill: '#34D399',
    },
    {
      name: 'Angry',
      value: comments.angry.length,
      perc: `${Math.floor((comments.angry.length / total) * 100)}%`,
      fill: '#F87171',
    },
    {
      name: 'Sad',
      value: comments.sad.length,
      perc: `${Math.floor((comments.sad.length / total) * 100)}%`,
      fill: '#60A5FA',
    },
    {
      name: 'Scared',
      value: comments.scared.length,
      perc: `${Math.floor((comments.scared.length / total) * 100)}%`,
      fill: '#FBBF24',
    },
    {
      name: 'Neutral',
      value: comments.neutral.length,
      perc: `${Math.floor((comments.neutral.length / total) * 100)}%`,
      fill: '#9CA3AF',
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie dataKey="value" data={pieData} outerRadius="90%">
          <LabelList
            dataKey="perc"
            position="inside"
            stroke="none"
            fill="white"
            style={{ fontSize: '1rem' }}
          />
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default SentimentPieChart;
