import * as React from 'react';
interface LogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'primary' | 'white' | 'dark' | 'gradient';
    showText?: boolean;
    className?: string;
}
export declare const Logo: React.FC<LogoProps>;
export declare const LogoMark: React.FC<{
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'primary' | 'white' | 'dark' | 'gradient';
}>;
export {};
