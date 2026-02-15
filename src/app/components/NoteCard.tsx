import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

interface NoteCardProps {
  title: string;
  description: string;
  date: string;
  category: string;
  color?: string;
}

export function NoteCard({ title, description, date, category, color }: NoteCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
      <div className={`h-48 flex items-center justify-center bg-gradient-to-br ${color || 'from-gray-200 to-gray-300'}`}>
        <div className="text-6xl">📈</div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
            {category}
          </span>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        </div>
        <h3 className="text-xl mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
          <span>Read more</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}