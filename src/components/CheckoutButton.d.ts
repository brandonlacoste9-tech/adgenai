import * as React from 'react';
interface CheckoutButtonProps {
    priceId: string;
    planName: string;
    className?: string;
    children: React.ReactNode;
    userId?: string;
    userEmail?: string;
    disabled?: boolean;
}
export declare const CheckoutButton: React.FC<CheckoutButtonProps>;
export {};
