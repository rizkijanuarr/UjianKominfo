import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.vue", { eager: true });
        console.log(`Resolving component: ./Pages/${name}.vue`);
        console.log(pages);
        return pages[`./Pages/${name}.vue`];
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            // Set mixins
            .mixin({
                methods: {
                    examTimeRangeChecker: function (start_time, end_time) {
                        return (
                            new Date() >= new Date(start_time) &&
                            new Date() <= new Date(end_time)
                        );
                    },
                    examTimeStartChecker: function (start_time) {
                        return new Date() < new Date(start_time);
                    },
                    examTimeEndChecker: function (end_time) {
                        return new Date() > new Date(end_time);
                    },
                },
            })
            .use(plugin)
            .mount(el);
    },
    progress: {
        delay: 250,
        color: "#29d",
        includeCSS: true,
        showSpinner: false,
    },
});
