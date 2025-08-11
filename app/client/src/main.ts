import "@/style.css";
import App from "@/App.vue";
import { i18n } from "@/modules/i18n";
import { router } from "@/modules/router";
import { store } from "@/modules/store";
import { createApp } from "vue";

const app = createApp(App);
app.use(i18n);
app.use(store);
app.use(router);
app.mount("#app");
