import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { AlertTriangle, Info, Star } from 'lucide-react';
export function Callout({ type = 'note', children }) {
    const config = {
        note: {
            colors: 'border-blue-300 bg-blue-50 text-blue-900',
            icon: _jsx(Info, { className: "w-5 h-5 text-blue-600" })
        },
        warn: {
            colors: 'border-amber-300 bg-amber-50 text-amber-900',
            icon: _jsx(AlertTriangle, { className: "w-5 h-5 text-amber-600" })
        },
        pro: {
            colors: 'border-emerald-300 bg-emerald-50 text-emerald-900',
            icon: _jsx(Star, { className: "w-5 h-5 text-emerald-600" })
        }
    }[type];
    return (_jsx("div", { className: `my-6 rounded-xl border-2 p-6 ${config.colors} shadow-lg hover:shadow-xl transition-all duration-300`, children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "flex-shrink-0 mt-0.5", children: config.icon }), _jsx("div", { className: "flex-1", children: children })] }) }));
}
