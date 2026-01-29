'use client';

import React, { useState } from 'react';
import Button from '@/ui/button';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { name, subject, message } = formData;

        // Construct mailto link
        const email = 'bbok4yo@gmail.com';
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(`[Portfolio Contact] ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\n\n${message}`)}`;

        window.location.href = mailtoLink;
    };

    const inputStyle = {
        width: '100%',
        padding: 'var(--spacing-md)',
        border: 'var(--border-thick)',
        boxShadow: 'var(--shadow-hard)',
        fontFamily: 'Pretendard, sans-serif',
        fontSize: '1rem',
        marginBottom: 'var(--spacing-lg)',
        outline: 'none',
        backgroundColor: '#ffffff'
    };

    return (
        <main style={{ padding: 'var(--spacing-xl) var(--spacing-md)', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
                fontSize: '3rem',
                borderBottom: 'var(--border-thick)',
                paddingBottom: 'var(--spacing-sm)',
                marginBottom: 'var(--spacing-lg)',
                textTransform: 'uppercase',
                fontWeight: '900'
            }}>
                Contact
            </h1>

            <div className="neo-box static" style={{ padding: 'var(--spacing-xl)' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-xl)', fontWeight: 'bold' }}>
                    Send me an email directly at <span style={{ textDecoration: 'underline', color: '#555' }}>bbok4yo@gmail.com</span> or use the form below.
                </p>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" style={{ display: 'block', fontWeight: 'bold', marginBottom: 'var(--spacing-sm)', fontSize: '1.1rem' }}>NAME</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                            placeholder="Your Name"
                        />
                    </div>

                    <div>
                        <label htmlFor="subject" style={{ display: 'block', fontWeight: 'bold', marginBottom: 'var(--spacing-sm)', fontSize: '1.1rem' }}>SUBJECT</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                            placeholder="What is this about?"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" style={{ display: 'block', fontWeight: 'bold', marginBottom: 'var(--spacing-sm)', fontSize: '1.1rem' }}>MESSAGE</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            style={{ ...inputStyle, resize: 'vertical' }}
                            placeholder="Tell me more..."
                        />
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <Button type="submit" style={{ fontSize: '1.2rem', padding: '12px 32px' }}>
                            SEND EMAIL
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
