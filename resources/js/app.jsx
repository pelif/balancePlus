import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import AppLayout from './Components/AppLayout';
import AuthLayout from './Components/AuthLayout';

createInertiaApp({
    resolve: async (name) => {
        const page = (await resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'))).default;

        // Define o layout específico para cada página
        if (name === 'Login') {
            page.layout = (page) => <AuthLayout>{page}</AuthLayout>;
        } else {
            page.layout = (page) => <AppLayout>{page}</AppLayout>;
        }

        return page;
    },
    setup: ({ el, App, props }) => {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});




