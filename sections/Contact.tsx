'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send, ShieldCheck, Zap, Loader2, CheckCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function Contact() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'Advertising Inquiry',
        message: ''
    });

    const supabase = createClient();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const whatsappNumber = "+2348123456789";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('gh_ad_requests')
            .insert([{
                brand_name: formData.name,
                contact_email: formData.email,
                plan: formData.type,
                budget: 'Inquiry',
                status: 'pending'
            }]);

        if (error) {
            console.error('Error recording inquiry:', error.message);
        }

        const message = `*New Inquiry*%0A%0A*Name:* ${formData.name}%0A*Type:* ${formData.type}%0A*Message:* ${formData.message}`;
        window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
        
        setSubmitted(true);
        setLoading(false);
    };

    return (
        <section id="contact" className="pt-40 pb-24 px-6 md:px-12 lg:px-24 bg-slate-950 relative overflow-hidden">
            {/* Glowing Accent */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px]" />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-10"
                    >
                        <div className="space-y-4">
                            <span className="badge-red">Contact Us</span>
                            <h2 className="text-3xl md:text-6xl font-black text-white leading-tight">
                                Let's build something <br />
                                <span className="text-primary italic">extraordinary.</span>
                            </h2>
                            <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed">
                                Whether you're an advertiser looking for reach or a viewer with feedback, we're here to listen and grow together.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-primary/20 transition-all group">
                                <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:scale-110 transition-transform w-fit">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">WhatsApp Support</h4>
                                    <p className="text-slate-400 font-medium">+234 (0) 812 345 6789</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] sm:text-sm">
                                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                                24h Response Time
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] sm:text-sm">
                                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                Instant Setup
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white p-6 md:p-12 rounded-[2.5rem] shadow-2xl"
                    >
                        {submitted ? (
                            <div className="text-center py-10 space-y-6">
                                <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">Message Sent!</h3>
                                <p className="text-slate-500 font-medium">Thank you for reaching out. Our team will contact you shortly.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="text-primary font-bold hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="your name"
                                        className="w-full px-6 py-4 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none shadow-sm font-medium text-slate-900"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Inquiry Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none shadow-sm appearance-none bg-white font-medium text-slate-600"
                                    >
                                        <option>Advertising Inquiry</option>
                                        <option>Partnership Proposal</option>
                                        <option>Content Contribution</option>
                                        <option>Support/Feedback</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Your Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Tell us what you have in mind..."
                                        className="w-full px-6 py-4 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none shadow-sm resize-none font-medium text-slate-900"
                                        required
                                    />
                                </div>

                                <button
                                    disabled={loading}
                                    className="btn-primary w-full flex items-center justify-center gap-3 py-5 text-lg group disabled:opacity-50"
                                >
                                    {loading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>

    );
}

