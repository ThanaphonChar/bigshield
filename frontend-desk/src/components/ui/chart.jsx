export function ChartContainer({ children, config, className }) {
    return (
        <div
            className={`relative flex items-center justify-center ${className}`}
            style={{
                "--color-desktop": config.desktop.color,
            }}
        >
            {children}
        </div>
    );
}

export function ChartTooltip({ children, cursor, content }) {
    return (
        <div>
            {children}
            {/* Example: Customize this if needed */}
            {content && content}
        </div>
    );
}

export function ChartTooltipContent() {
    return <div className="p-2 bg-white shadow rounded">Tooltip</div>;
}
