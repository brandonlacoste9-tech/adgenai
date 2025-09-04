import * as React from 'react';
interface CalloutProps {
    type?: 'note' | 'warn' | 'pro';
    children: React.ReactNode;
}
export declare function Callout({ type, children }: CalloutProps): import("react/jsx-runtime").JSX.Element;
export {};
