'use client';

import React from 'react';

interface EditorProps {
  content: any;
  onChange: (content: any) => void;
  onSave?: () => Promise<void>;
  loading?: boolean;
}

const Editor: React.FC<EditorProps> = ({ content, onChange, onSave, loading }) => {
  return (
    <div className='w-full min-h-[400px] p-4 bg-white border border-slate-200 rounded-xl focus-within:border-primary transition-colors'>
      <textarea
        value={typeof content === 'string' ? content : (content ? JSON.stringify(content) : '')}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Start writing your story...'
        className='w-full h-full min-h-[380px] bg-transparent border-none outline-none resize-none text-slate-700 font-medium leading-relaxed'
        disabled={loading}
      />
    </div>
  );
};

export default Editor;
