import React from 'react';
import { shallow } from 'enzyme';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';

describe('BodySectionWithMarginBottom tests', () => {
  it('should apply margin bottom to child component', () => {
    const wrapper = shallow(
      <BodySectionWithMarginBottom title='test title'>
        <p>Test Child</p>
      </BodySectionWithMarginBottom>
    );

    expect(wrapper.find(BodySection)).toHaveLength(1);
    expect(wrapper.find(BodySection).html()).toContain('<h2>test title</h2>');
    expect(wrapper.find(BodySection).html()).toContain('<p>Test Child</p>');
  });
});
