require("./bootstrap");
require("vue-multiselect/dist/vue-multiselect.min.css");

import Vue from "vue";
import { InertiaApp } from "@inertiajs/inertia-vue";
import { InertiaForm } from "laravel-jetstream";
import ConfirmModalMixin from "./plugins/ConfirmModalMixin";
import VueGoogleApi from "vue-google-api";
import "./plugins/element-ui";

const config = {
    apiKey: process.env.MIX_GOOGLE_APP_KEY,
    clientId: process.env.MIX_GOOGLE_CLIENT_ID,
    accessType: "offline",
    scope: "profile https://www.googleapis.com/auth/gmail.readonly",
    discoveryDocs: []
};

import Multiselect from "vue-multiselect";
import PortalVue from "portal-vue";
import Vuelidate from "vuelidate";
import confetti from "canvas-confetti";

Vue.use(Vuelidate);
Vue.use(InertiaApp);
Vue.use(InertiaForm);
Vue.use(PortalVue);
Vue.use(VueGoogleApi, config);
Vue.mixin(ConfirmModalMixin);
Vue.mixin({
    methods: {
        celebrate() {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }
})
Vue.component("multiselect", Multiselect);

// InertiaProgress.init();

const app = document.querySelector("[data-page]");

new Vue({
    render: h =>
        h(InertiaApp, {
            props: {
                initialPage: JSON.parse(app.dataset.page),
                resolveComponent: name => require(`./Pages/${name}`).default
            }
        })
}).$mount(app);
