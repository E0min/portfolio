import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, title, className = '', ...props }) => {
    return (
        <div className={`neo-box ${className}`} {...props} style={{ padding: 'var(--spacing-md)', ...props.style }}>
            {title && (
                <div style={{
                    borderBottom: 'var(--border-thick)',
                    marginBottom: 'var(--spacing-md)',
                    paddingBottom: 'var(--spacing-sm)',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                }}>
                    {title}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
