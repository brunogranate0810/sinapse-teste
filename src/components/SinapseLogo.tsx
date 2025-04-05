
import React from 'react';
import { cn } from '@/lib/utils';

interface SinapseLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SinapseLogo({ size = 'md', className }: SinapseLogoProps) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <div className={cn(
      "rounded bg-[#012742] flex items-center justify-center",
      sizes[size],
      className
    )}>
      <svg 
        viewBox="0 0 36 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full p-1"
      >
        <path 
          d="M18 4C10.268 4 4 10.268 4 18C4 25.732 10.268 32 18 32C25.732 32 32 25.732 32 18C32 10.268 25.732 4 18 4Z" 
          stroke="#E7F5FF" 
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path 
          d="M10 18C10 13.582 13.582 10 18 10C22.418 10 26 13.582 26 18" 
          stroke="#BFE5FF" 
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path 
          d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14" 
          stroke="#BFE5FF" 
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="18" r="2" fill="#E7F5FF" />
      </svg>
    </div>
  );
}
