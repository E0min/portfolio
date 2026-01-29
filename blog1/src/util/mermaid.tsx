'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
    chart: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    // 1. Heuristic Height Calculation (Synchronous to prevent layout shift)
    const estimatedHeight = React.useMemo(() => {
        if (!chart) return '200px';

        const lines = chart.split('\n').filter(line => line.trim() !== '').length;
        const isSequence = chart.includes('sequenceDiagram');
        const isClass = chart.includes('classDiagram');
        const isState = chart.includes('stateDiagram');

        let baseHeight = 100;
        let lineHeight = 40; // Default

        if (isSequence) {
            lineHeight = 60; // Sequence diagrams tend to be taller
        } else if (isClass) {
            lineHeight = 50;
        } else if (isState) {
            lineHeight = 50;
        }

        // Formula: Base + (Lines * LineHeight)
        const height = baseHeight + (lines * lineHeight);

        // Cap minimum and maximum to reasonable values
        return `${Math.min(Math.max(height, 200), 800)}px`;
    }, [chart]);

    useEffect(() => {
        const renderDiagram = async () => {
            if (!chart) return;
            setLoading(true);

            try {
                // Short delay to ensure blinking effect is visible and layout stabilizes
                await new Promise(resolve => setTimeout(resolve, 300));

                mermaid.initialize({
                    startOnLoad: false,
                    theme: 'base',
                    securityLevel: 'loose',
                    themeVariables: {
                        fontFamily: '"Pretendard", monospace',
                        fontWeight: '400',
                        primaryColor: '#ffffff',
                        primaryTextColor: '#000000',
                        primaryBorderColor: '#000000',
                        lineColor: '#000000',
                        secondaryColor: '#ffffff',
                        tertiaryColor: '#ffffff',
                        mainBkg: '#ffffff',
                        nodeBorder: '#000000',
                        clusterBkg: '#ffffff',
                        clusterBorder: '#000000',
                        defaultLinkColor: '#000000',
                        edgeLabelBackground: '#ffffff',
                        actorBorder: '#000000',
                        actorBkg: '#ffffff',
                        actorTextColor: '#000000',
                        actorLineColor: '#000000',
                        signalColor: '#000000',
                        signalTextColor: '#000000'
                    }
                });

                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                const { svg } = await mermaid.render(id, chart);
                setSvg(svg);
                setLoading(false);
            } catch (error) {
                console.error('Mermaid rendering error:', error);
                setSvg(`<pre style="color: red;">Error rendering diagram: ${error}</pre>`);
                setLoading(false);
            }
        };

        renderDiagram();
    }, [chart]);

    if (loading) {
        return (
            <div

                style={{ height: estimatedHeight }}
                className="neo-skeleton"
            >
                LOADING GRAPH...
            </div>
        );
    }

    return (
        <div
            ref={ref}
            style={{
                marginBottom: 'var(--spacing-lg)',
                border: 'none',
                padding: 'var(--spacing-md)',
                backgroundColor: '#ffffff',
                overflowX: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
};

export default Mermaid;
