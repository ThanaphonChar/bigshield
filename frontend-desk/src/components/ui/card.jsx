export function Card({ children, className }) {
    return <div className={`rounded-lg border p-4 shadow ${className}`}>{children}</div>;
}

export function CardHeader({ children, className }) {
    return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children }) {
    return <h2 className="text-lg font-bold">{children}</h2>;
}

export function CardDescription({ children }) {
    return <p className="text-sm text-muted-foreground">{children}</p>;
}

export function CardContent({ children, className }) {
    return <div className={`text-base ${className}`}>{children}</div>;
}

export function CardFooter({ children, className }) {
    return <div className={`mt-4 border-t pt-4 ${className}`}>{children}</div>;
}
