import { configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

// Configure Enzyme with React 18 adapter
configure({ adapter: new Adapter() });
