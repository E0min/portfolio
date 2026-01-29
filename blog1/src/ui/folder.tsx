import React from 'react';

interface FolderProps {
    title: string;
    children: React.ReactNode;
    className?: string; // Allow extending classes
}

const Folder: React.FC<FolderProps> = ({ title, children, className = '' }) => {
    return (
        <div className={`neo-folder-wrapper ${className}`} style={{ position: 'relative', marginTop: '30px' }}>
            {/* Folder Tab */}
            <div style={{
                position: 'absolute',
                top: '-28px',
                left: '0',
                height: '30px',
                width: '150px',
                backgroundColor: 'var(--bg-color)',
                border: 'var(--border-thick)',
                borderBottom: 'none',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 'var(--spacing-sm)',
                fontWeight: '900',
                fontSize: '0.9rem',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px'
            }}>
                {/* Truncate title in tab if needed, or just specific text */}
                PROJECT
            </div>

            {/* Folder Body */}
            <div className="neo-box static" style={{
                position: 'relative',
                borderTopLeftRadius: '0',
                zIndex: 2,
                padding: 'var(--spacing-lg)',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <h2 style={{
                    fontSize: '1.8rem',
                    marginBottom: 'var(--spacing-md)',
                    borderBottom: 'var(--border-thick)',
                    paddingBottom: 'var(--spacing-sm)',
                    fontFamily: '"Pretendard", sans-serif',
                    fontWeight: '900',
                    textTransform: 'uppercase'
                }}>
                    {title}
                </h2>
                {children}
            </div>
        </div>
    );
};

export default Folder;
