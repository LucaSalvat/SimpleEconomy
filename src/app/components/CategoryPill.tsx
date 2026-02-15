interface CategoryPillProps {
  name: string;
  active?: boolean;
}

export function CategoryPill({ name, active = false }: CategoryPillProps) {
  return (
    <button
      className={`px-4 py-2 rounded-full transition-colors ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {name}
    </button>
  );
}
