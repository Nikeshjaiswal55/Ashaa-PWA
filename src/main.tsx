import '@fontsource/lexend';
// Defaults to weight 400
import '@fontsource/lexend-deca';

import welcome from '@/utils/welcome';
import store from "react-redux";
import '../src/style.css';

Promise.all([import('@/Root'), import('@/App')]).then(([{ default: render }, { default: App }]) => {
  render(App);
});

// welcome message for users in the console
welcome();

// ts(1208)
export {};
