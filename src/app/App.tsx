import { BookOpen, Search, Menu, TrendingUp, ArrowRight } from 'lucide-react';
import { NoteCard } from './components/NoteCard';
import { CategoryPill } from './components/CategoryPill';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export default function App() {
  const categories = [
    'All Notes',
    'Microeconomics',
    'Macroeconomics',
    'Econometrics',
    'Development',
    'Finance'
  ];

  const featuredNote = {
    title: 'Understanding Supply and Demand Dynamics',
    description: 'A comprehensive analysis of how supply and demand curves interact in various market conditions, with real-world examples from recent economic events.',
    date: 'Feb 10, 2026',
    category: 'Microeconomics'
  };

  const popularTopics = [
    {
      title: 'Market Equilibrium',
      noteCount: 12,
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Fiscal Policy',
      noteCount: 8,
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Game Theory',
      noteCount: 15,
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'International Trade',
      noteCount: 10,
      color: 'from-orange-400 to-orange-600'
    }
  ];

  const latestInsights = [
    {
      title: 'The Phillips Curve and Modern Inflation',
      description: 'Examining the relationship between unemployment and inflation in contemporary economic policy.',
      date: 'Feb 12, 2026',
      category: 'Macroeconomics',
      color: 'from-indigo-100 to-blue-100'
    },
    {
      title: 'Behavioral Economics: Decision Making',
      description: 'How cognitive biases and heuristics influence economic choices and market outcomes.',
      date: 'Feb 11, 2026',
      category: 'Microeconomics',
      color: 'from-purple-100 to-pink-100'
    },
    {
      title: 'Sustainable Development Goals',
      description: 'Economic strategies for achieving environmental sustainability and inclusive growth.',
      date: 'Feb 9, 2026',
      category: 'Development',
      color: 'from-green-100 to-teal-100'
    }
  ];

  const notes = [
    {
      title: 'GDP and Economic Growth Indicators',
      description: 'Exploring the relationship between GDP growth, unemployment rates, and inflation in developed economies.',
      date: 'Feb 8, 2026',
      category: 'Macroeconomics',
      color: 'from-blue-200 to-cyan-200'
    },
    {
      title: 'Regression Analysis in Economic Research',
      description: 'An introduction to linear regression models and their applications in economic forecasting and policy analysis.',
      date: 'Feb 5, 2026',
      category: 'Econometrics',
      color: 'from-violet-200 to-purple-200'
    },
    {
      title: 'Market Structures: Perfect Competition vs Monopoly',
      description: 'Comparing different market structures and their impact on consumer welfare and economic efficiency.',
      date: 'Feb 1, 2026',
      category: 'Microeconomics',
      color: 'from-emerald-200 to-green-200'
    },
    {
      title: 'Monetary Policy Tools and Their Effects',
      description: 'How central banks use interest rates, reserve requirements, and open market operations to influence the economy.',
      date: 'Jan 28, 2026',
      category: 'Macroeconomics',
      color: 'from-amber-200 to-orange-200'
    },
    {
      title: 'Income Inequality and Economic Development',
      description: 'Examining the relationship between income distribution and sustainable economic growth in emerging markets.',
      date: 'Jan 25, 2026',
      category: 'Development',
      color: 'from-rose-200 to-pink-200'
    },
    {
      title: 'Time Series Analysis for Economic Forecasting',
      description: 'Understanding ARIMA models and their practical applications in predicting economic trends.',
      date: 'Jan 20, 2026',
      category: 'Econometrics',
      color: 'from-teal-200 to-cyan-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-gray-900">Economics Notes</h1>
                <p className="text-sm text-gray-500">Your personal economics knowledge base</p>
              </div>
            </div>
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <nav className="hidden lg:flex items-center gap-6">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Categories</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl mb-4">
              Economics Made Simple
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Comprehensive notes, insights, and analyses on economic theory, policy, and real-world applications.
            </p>
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <CategoryPill 
                key={category} 
                name={category} 
                active={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Note */}
        <section className="mb-12">
          <h2 className="text-3xl text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            Featured Note
          </h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 grid md:grid-cols-2 gap-0">
            <div className="h-64 md:h-auto bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="text-white text-center p-8">
                <div className="text-6xl mb-4">📊</div>
                <div className="text-2xl opacity-90">Supply & Demand</div>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm px-4 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {featuredNote.category}
                </span>
                <span className="text-sm text-gray-500">{featuredNote.date}</span>
              </div>
              <h3 className="text-3xl text-gray-900 mb-4">{featuredNote.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {featuredNote.description}
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-fit">
                Read Full Note
              </button>
            </div>
          </div>
        </section>

        {/* Popular Topics */}
        <section className="mb-12">
          <h2 className="text-3xl text-gray-900 mb-6">Popular Topics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTopics.map((topic) => (
              <div
                key={topic.title}
                className={`bg-gradient-to-br ${topic.color} rounded-xl p-6 text-white cursor-pointer hover:scale-105 transition-transform shadow-md`}
              >
                <h3 className="text-xl mb-2">{topic.title}</h3>
                <p className="text-white/90">{topic.noteCount} notes</p>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Insights */}
        <section className="mb-12">
          <h2 className="text-3xl text-gray-900 mb-6">Latest Insights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {latestInsights.map((insight) => (
              <div
                key={insight.title}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
              >
                <div className={`h-32 bg-gradient-to-br ${insight.color} flex items-center justify-center`}>
                  <div className="text-5xl">💡</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {insight.category}
                    </span>
                    <span className="text-sm text-gray-500">{insight.date}</span>
                  </div>
                  <h3 className="text-xl mb-2 text-gray-900">{insight.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{insight.description}</p>
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Notes */}
        <section>
          <h2 className="text-3xl text-gray-900 mb-6">Recent Notes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note.title} {...note} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl">Economics Notes</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Building a comprehensive collection of economics knowledge, one note at a time.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Archive</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Subscribe</a></li>
                <li><a href="#" className="hover:text-white transition-colors">RSS Feed</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Economics Notes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}