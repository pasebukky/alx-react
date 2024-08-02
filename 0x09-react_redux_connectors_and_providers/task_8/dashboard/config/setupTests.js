import { configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
// setupTests.js
import util from 'util';

if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = util.TextEncoder;
}


// Configure Enzyme with React 18 adapter
configure({ adapter: new Adapter() });

jest.mock('aphrodite', () => ({
    StyleSheetTestUtils: {
        suppressStyleInjection: () => {},
        clearBufferAndResumeStyleInjection: () => {}
    },
    css: () => '',
    StyleSheet: {
        create: () => ({})
    }
}));
