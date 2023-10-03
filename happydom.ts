// happy-dom
import { Window } from "happy-dom";
const window = new Window();
window._getWindow = () => window;
const document = window.document;
global.document = document;
global.window = window;
