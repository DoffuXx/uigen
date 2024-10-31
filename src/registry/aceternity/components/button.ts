import { Component, ComponentSchema } from '../../../types';

export const button: Component = ComponentSchema.parse({
  name: 'Button',
  description: 'AceTernity Button',
  type: 'button',
  updatedAt: '2024-10-25',
  files: [
    {
      filename: 'button.tsx',
      content: `
import * as React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={\`inline-flex items-center justify-center transition-colors \${className}\`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps }
`,
    },
  ],
});
