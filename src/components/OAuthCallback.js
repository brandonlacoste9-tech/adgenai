import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
export const OAuthCallback = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) {
                    console.error('Auth callback error:', error);
                    navigate('/');
                    return;
                }
                if (data.session) {
                    // Successful authentication
                    navigate('/dashboard');
                }
                else {
                    navigate('/');
                }
            }
            catch (error) {
                console.error('Auth callback error:', error);
                navigate('/');
            }
        };
        handleAuthCallback();
    }, [navigate]);
    return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Completing authentication..." })] }) }));
};
