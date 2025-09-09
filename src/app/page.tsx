"use client"
import React, { useState } from 'react';
import { Search, Settings, Archive, Trash2, Edit3 } from 'lucide-react';

const NotesApp = () => {
  const [selectedNote, setSelectedNote] = useState('React Performance Optimization');
  const [isEditing, setIsEditing] = useState(false);

  const tags = [
    { name: 'Cooking', count: 0 },
    { name: 'Dev', count: 0 },
    { name: 'Fitness', count: 0 },
    { name: 'Health', count: 0 },
    { name: 'Personal', count: 0 },
    { name: 'React', count: 0 },
    { name: 'Recipes', count: 0 },
    { name: 'Shopping', count: 0 },
    { name: 'Travel', count: 0 },
    { name: 'TypeScript', count: 0 },
  ]

  const notes = [
    {
      title: 'React Performance Optimization',
      tags: ['Dev', 'React'],
      date: '29 Oct 2024',
      content: `Key performance optimization techniques:

1. Code Splitting
- Use React.lazy() for route-based splitting
- Implement dynamic imports for heavy components

2. Memoization
- useMemo for expensive calculations
- useCallback for function props
- React.memo for component optimization

3. Virtual List Implementation
- Use react-window for long lists
- Implement infinite scrolling

TODO: Benchmark current application and identify bottlenecks`
    },
    {
      title: 'Japan Travel Planning',
      tags: ['Travel', 'Personal'],
      date: '28 Oct 2024',
      content: 'Planning trip to Japan...'
    },
    {
      title: 'Favorite Pasta Recipes',
      tags: ['Cooking', 'Recipes'],
      date: '27 Oct 2024',
      content: 'Collection of favorite pasta recipes...'
    },
    {
      title: 'Weekly Workout Plan',
      tags: ['Dev', 'React'],
      date: '25 Oct 2024',
      content: 'Workout schedule for the week...'
    },
    {
      title: 'Meal Prep Ideas',
      tags: ['Cooking', 'Health', 'Recipes'],
      date: '12 Oct 2024',
      content: 'Healthy meal prep ideas...'
    },
    {
      title: 'Reading List',
      tags: ['Personal', 'Dev'],
      date: '05 Oct 2024',
      content: 'Books to read...'
    },
    {
      title: 'Fitness Goals 2025',
      tags: ['Fitness', 'Health', 'Personal'],
      date: '22 Sep 2024',
      content: 'Goals for next year...'
    },
  ];

  const currentNote = notes.find(note => note.title === selectedNote) || notes[0];

  return (
    <div className="flex h-screen bg-gray-50">      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <Edit3 className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg text-gray-900">Notes</span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 text-gray-700 mb-2 cursor-pointer">
            <span className="text-sm">📝</span>
            <span className="text-sm font-medium">All Notes</span>
            <span className="text-xs text-gray-500 ml-auto">›</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 mb-4 cursor-pointer">
            <Archive className="w-4 h-4" />
            <span className="text-sm">Archived Notes</span>
          </div>
        </div>

        <div className="px-4 mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Tags</h3>
          <div className="space-y-1">
            {tags.map((tag) => (
              <div key={tag.name} className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-800 py-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span className="text-sm">{tag.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="w-80 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">All Notes</h2>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              + Create New Note
            </button>
          </div>
          <div className="overflow-y-auto">
            {notes.map((note) => (
              <div
                key={note.title}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedNote === note.title ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                }`}
                onClick={() => setSelectedNote(note.title)}
              >
                <h3 className="font-medium text-gray-900 mb-2">{note.title}</h3>
                <div className="flex flex-wrap gap-1 mb-2">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500">{note.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">

          <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, content, or tags..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Settings className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="p-6 bg-white border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{currentNote.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <span>🏷️</span>
                  <span>Tags</span>
                  <div className="flex gap-1 ml-2">
                    {currentNote.tags.map((tag) => (
                      <span key={tag} className="text-gray-700">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span>⏰</span>
                  <span>Last edited</span>
                  <span className="text-gray-700">{currentNote.date}</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded border">
                  <Archive className="w-4 h-4" />
                  Archive Note
                </button>
                <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded border">
                  <Trash2 className="w-4 h-4" />
                  Delete Note
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 bg-gray-50">
              <div className="bg-white rounded-lg p-6 h-full">
                <pre className="whitespace-pre-wrap text-gray-800 font-sans text-sm leading-relaxed">
{currentNote.content}
                </pre>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-200 flex gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Save Note
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesApp;