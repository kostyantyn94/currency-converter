import type React from "react"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    children: React.ReactNode
}

export function Select({ children, className, ...props }: SelectProps) {
    return (
        <select
            className={`p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
        >
            {children}
        </select>
    )
}

export function SelectItem({ children, ...props }: React.OptionHTMLAttributes<HTMLOptionElement>) {
    return <option {...props}>{children}</option>
}

