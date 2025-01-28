import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import AppLayout from './Components/AppLayout';

createInertiaApp({
    resolve: async (name) => {
        const page = (await resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'))).default;

        // Defina o layout global, se a página não tiver layout
        page.layout ??= (page) => <AppLayout>{page}</AppLayout>;

        return page;
    },
    setup: ({ el, App, props }) => {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});




