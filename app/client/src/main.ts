import "@/style.css";
import App from "@/App.vue";
import { i18n } from "@/modules/i18n";
import { createApp } from "vue";

const app = createApp(App);
app.use(i18n);
app.mount("#app");
