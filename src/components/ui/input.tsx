import type React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={`p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
        />
    )
}

