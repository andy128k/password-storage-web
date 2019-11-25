import React from 'react';
import renderer from 'react-test-renderer';
import EntryView from '.';

describe('EntryView', function() {
  function textNodes(node) {
    return node
      .findAllByType('div')
      .flatMap(div => div.children)
      .filter(node => typeof node === 'string');
  }

  it('renders empty', function() {
    const component = renderer.create(
      <EntryView entry={null} />
    );
    const tree = component.toJSON();
    expect(tree.children).toBeNull();
  });

  it('renders single field', function() {
    const component = renderer.create(
      <EntryView entry={{name: 'value'}} />
    );
    expect(textNodes(component.root)).toStrictEqual(['name', 'value']);
  });

  it('renders multiple fields', function() {
    const component = renderer.create(
      <EntryView entry={{name: 'John', surname: 'Doe'}} />
    );
    expect(textNodes(component.root)).toStrictEqual(['name', 'John', 'surname', 'Doe']);
  });
});
