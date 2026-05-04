'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Type, Layout, User, Tag } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function NewPostPage() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        image_url: '',
        category: 'Lifestyle',
        author: 'Emmanuel Kalu Olugu',
        status: 'published'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            if (name === 'title') {
                newData.slug = value.toLowerCase().trim().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
                // Auto-generate excerpt if empty or matches old title
                if (!prev.excerpt || prev.excerpt === prev.title) {
                    newData.excerpt = value;
                }
            }
            return newData;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.content) {
            alert('Please fill in title and content');
            return;
        }

        setLoading(true);

        const { error } = await supabase
            .from('gh_posts')
            .insert([{
                ...formData,
                created_at: new Date().toISOString()
            }]);

        if (error) {
            alert('Error creating post: ' + error.message);
        } else {
            router.push('/admin/dashboard/blog');
            router.refresh();
        }
        setLoading(false);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <Link href="/admin/dashboard/blog" className="p-3 bg-white border border-slate-100 shadow-sm hover:bg-slate-50 rounded-2xl transition-all active:scale-95">
                        <ArrowLeft className="w-6 h-6 text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create <span className="text-primary italic">New Story</span></h1>
                        <p className="text-slate-500 font-medium">Add fresh content to the Uniziktalkertive platform.</p>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full md:w-auto bg-slate-900 text-white px-10 py-5 rounded-[2rem] flex items-center justify-center gap-3 font-black hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    Publish Story
                </button>
            </div>

            <form className="grid grid-cols-1 lg:grid-cols-3 gap-10" onSubmit={handleSubmit}>
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-soft border border-slate-50 space-y-8">
                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
                                <Type className="w-3.5 h-3.5" /> Post Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter a catchy headline..."
                                className="w-full bg-slate-50 border-none rounded-[1.5rem] px-6 py-4 text-xl font-bold focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
                                <Layout className="w-3.5 h-3.5" /> Short Excerpt
                            </label>
                            <textarea
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Brief summary for the blog listing page..."
                                className="w-full bg-slate-50 border-none rounded-[1.5rem] px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
                                <Save className="w-3.5 h-3.5" /> Full Story
                            </label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows={15}
                                placeholder="Tell your story here..."
                                className="w-full bg-slate-50 border-none rounded-[2rem] px-8 py-6 text-base font-medium focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-8">
                    <div className="bg-slate-950 p-8 rounded-[2.5rem] shadow-xl text-white space-y-8">
                        <h3 className="text-lg font-black tracking-tight border-b border-white/10 pb-4">Story Settings</h3>
                        
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                <Tag className="w-3 h-3" /> Category
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer text-white"
                            >
                                <option className="bg-slate-900">Lifestyle</option>
                                <option className="bg-slate-900">Tech</option>
                                <option className="bg-slate-900">Growth</option>
                                <option className="bg-slate-900">Industry</option>
                                <option className="bg-slate-900">Monetization</option>
                                <option className="bg-slate-900">Campus News</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                <User className="w-3 h-3" /> Author Name
                            </label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary/40 transition-all text-white"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                <ImageIcon className="w-3 h-3" /> Cover Image URL
                            </label>
                            <input
                                type="text"
                                name="image_url"
                                value={formData.image_url}
                                onChange={handleChange}
                                placeholder="Paste image link here..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-primary/40 transition-all text-white placeholder:text-slate-600"
                            />
                        </div>

                        <div className="pt-4">
                            <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                                <p className="text-[11px] text-primary font-bold leading-relaxed">
                                    Tip: Use high-quality Unsplash links for the best visual experience on the homepage.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft space-y-4">
                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">URL Preview</h4>
                        <div className="p-4 bg-slate-50 rounded-xl break-all">
                            <p className="text-[11px] font-mono text-slate-500">
                                /blog/<span className="text-primary font-bold">{formData.slug || 'your-post-slug'}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}