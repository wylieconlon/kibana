/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { shallow, mount } from 'enzyme';
import React, { ChangeEvent, ReactElement } from 'react';
import { EuiComboBox, EuiFieldSearch, EuiContextMenuPanel } from '@elastic/eui';
import { IndexPatternPrivateState, IndexPatternColumn } from './indexpattern';
import { createMockedDragDropContext } from './mocks';
import { InnerIndexPatternDataPanel, IndexPatternDataPanel, MemoizedDataPanel } from './datapanel';
import { FieldItem } from './field_item';
import { act } from 'react-dom/test-utils';
import { npStart as npStartMock } from 'ui/new_platform';

jest.mock('ui/new_platform');
jest.mock('./loader');

const waitForPromises = () => new Promise(resolve => setTimeout(resolve));

const initialState: IndexPatternPrivateState = {
  currentIndexPatternId: '1',
  showEmptyFields: false,
  layers: {
    first: {
      indexPatternId: '1',
      columnOrder: ['col1', 'col2'],
      columns: {
        col1: {
          label: 'My Op',
          dataType: 'string',
          isBucketed: true,
          operationType: 'terms',
          sourceField: 'source',
          params: {
            size: 5,
            orderDirection: 'asc',
            orderBy: {
              type: 'alphabetical',
            },
          },
        },
        col2: {
          label: 'My Op',
          dataType: 'number',
          isBucketed: false,
          operationType: 'avg',
          sourceField: 'memory',
        },
      },
    },
    second: {
      indexPatternId: '1',
      columnOrder: ['col1', 'col2'],
      columns: {
        col1: {
          label: 'My Op',
          dataType: 'string',
          isBucketed: true,
          operationType: 'terms',
          sourceField: 'source',
          params: {
            size: 5,
            orderDirection: 'asc',
            orderBy: {
              type: 'alphabetical',
            },
          },
        },
        col2: {
          label: 'My Op',
          dataType: 'number',
          isBucketed: false,
          operationType: 'avg',
          sourceField: 'bytes',
        },
      },
    },
  },
  indexPatterns: {
    '1': {
      id: '1',
      title: 'my-fake-index-pattern',
      timeFieldName: 'timestamp',
      fields: [
        {
          name: 'timestamp',
          type: 'date',
          aggregatable: true,
          searchable: true,
        },
        {
          name: 'bytes',
          type: 'number',
          aggregatable: true,
          searchable: true,
        },
        {
          name: 'memory',
          type: 'number',
          aggregatable: true,
          searchable: true,
        },
        {
          name: 'unsupported',
          type: 'geo',
          aggregatable: true,
          searchable: true,
        },
        {
          name: 'source',
          type: 'string',
          aggregatable: true,
          searchable: true,
        },
      ],
    },
    '2': {
      id: '2',
      title: 'my-fake-restricted-pattern',
      timeFieldName: 'timestamp',
      fields: [
        {
          name: 'timestamp',
          type: 'date',
          aggregatable: true,
          searchable: true,
          aggregationRestrictions: {
            date_histogram: {
              agg: 'date_histogram',
              fixed_interval: '1d',
              delay: '7d',
              time_zone: 'UTC',
            },
          },
        },
        {
          name: 'bytes',
          type: 'number',
          aggregatable: true,
          searchable: true,
          aggregationRestrictions: {
            histogram: {
              agg: 'histogram',
              interval: 1000,
            },
            max: {
              agg: 'max',
            },
            min: {
              agg: 'min',
            },
            sum: {
              agg: 'sum',
            },
          },
        },
        {
          name: 'source',
          type: 'string',
          aggregatable: true,
          searchable: true,
          aggregationRestrictions: {
            terms: {
              agg: 'terms',
            },
          },
        },
      ],
    },
    '3': {
      id: '3',
      title: 'my-compatible-pattern',
      timeFieldName: 'timestamp',
      fields: [
        {
          name: 'timestamp',
          type: 'date',
          aggregatable: true,
          searchable: true,
        },
        {
          name: 'bytes',
          type: 'number',
          aggregatable: true,
          searchable: true,
        },
        {
          name: 'source',
          type: 'string',
          aggregatable: true,
          searchable: true,
        },
      ],
    },
  },
};
describe('IndexPattern Data Panel', () => {
  let defaultProps: Parameters<typeof InnerIndexPatternDataPanel>[0];

  beforeEach(() => {
    defaultProps = {
      dragDropContext: createMockedDragDropContext(),
      currentIndexPatternId: '1',
      indexPatterns: initialState.indexPatterns,
      showIndexPatternSwitcher: false,
      setShowIndexPatternSwitcher: jest.fn(),
      onChangeIndexPattern: jest.fn(),
      dateRange: {
        fromDate: 'now-7d',
        toDate: 'now',
      },
      query: { query: '', language: 'lucene' },
      showEmptyFields: false,
      onToggleEmptyFields: jest.fn(),
    };
  });

  it('should update index pattern of layer on switch if it is a single empty one', async () => {
    const setStateSpy = jest.fn();
    const wrapper = shallow(
      <IndexPatternDataPanel
        {...defaultProps}
        state={{
          ...initialState,
          layers: { first: { indexPatternId: '1', columnOrder: [], columns: {} } },
        }}
        setState={setStateSpy}
        dragDropContext={{ dragging: {}, setDragging: () => {} }}
      />
    );

    act(() => {
      wrapper.find(MemoizedDataPanel).prop('setShowIndexPatternSwitcher')!(true);
    });
    wrapper.find(MemoizedDataPanel).prop('onChangeIndexPattern')!('2');

    expect(setStateSpy).toHaveBeenCalledWith({
      ...initialState,
      layers: { first: { indexPatternId: '2', columnOrder: [], columns: {} } },
      currentIndexPatternId: '2',
    });
  });

  it('should not update index pattern of layer on switch if there are more than one', async () => {
    const setStateSpy = jest.fn();
    const state = {
      ...initialState,
      layers: {
        first: { indexPatternId: '1', columnOrder: [], columns: {} },
        second: { indexPatternId: '1', columnOrder: [], columns: {} },
      },
    };
    const wrapper = shallow(
      <IndexPatternDataPanel
        {...defaultProps}
        state={state}
        setState={setStateSpy}
        dragDropContext={{ dragging: {}, setDragging: () => {} }}
      />
    );

    act(() => {
      wrapper.find(MemoizedDataPanel).prop('setShowIndexPatternSwitcher')!(true);
    });
    wrapper.find(MemoizedDataPanel).prop('onChangeIndexPattern')!('2');

    expect(setStateSpy).toHaveBeenCalledWith({ ...state, currentIndexPatternId: '2' });
  });

  it('should not update index pattern of layer on switch if there are columns configured', async () => {
    const setStateSpy = jest.fn();
    const state = {
      ...initialState,
      layers: {
        first: {
          indexPatternId: '1',
          columnOrder: ['col1'],
          columns: { col1: {} as IndexPatternColumn },
        },
      },
    };
    const wrapper = shallow(
      <IndexPatternDataPanel
        {...defaultProps}
        state={state}
        setState={setStateSpy}
        dragDropContext={{ dragging: {}, setDragging: () => {} }}
      />
    );

    act(() => {
      wrapper.find(MemoizedDataPanel).prop('setShowIndexPatternSwitcher')!(true);
    });
    wrapper.find(MemoizedDataPanel).prop('onChangeIndexPattern')!('2');

    expect(setStateSpy).toHaveBeenCalledWith({ ...state, currentIndexPatternId: '2' });
  });

  it('should render a warning if there are no index patterns', () => {
    const wrapper = shallow(
      <InnerIndexPatternDataPanel {...defaultProps} currentIndexPatternId="" indexPatterns={{}} />
    );
    expect(wrapper.find('[data-test-subj="indexPattern-no-indexpatterns"]')).toHaveLength(1);
  });

  it('should call setState when the index pattern is switched', async () => {
    const wrapper = shallow(<InnerIndexPatternDataPanel {...defaultProps} />);

    wrapper.find('[data-test-subj="indexPattern-switch-link"]').simulate('click');

    expect(defaultProps.setShowIndexPatternSwitcher).toHaveBeenCalledWith(true);

    wrapper.setProps({ showIndexPatternSwitcher: true });

    const comboBox = wrapper.find(EuiComboBox);

    comboBox.prop('onChange')!([
      {
        label: initialState.indexPatterns['2'].title,
        value: '2',
      },
    ]);

    expect(defaultProps.onChangeIndexPattern).toHaveBeenCalledWith('2');
  });

  describe('loading existence data', () => {
    beforeEach(() => {
      (npStartMock.core.http.post as jest.Mock).mockClear();
    });

    it('loads existence data and updates the index pattern', async () => {
      (npStartMock.core.http.post as jest.Mock).mockResolvedValue({
        timestamp: {
          exists: true,
          cardinality: 500,
          count: 500,
        },
      });
      const updateFields = jest.fn();
      mount(<InnerIndexPatternDataPanel {...defaultProps} updateFieldsWithCounts={updateFields} />);

      await waitForPromises();

      expect(npStartMock.core.http.post as jest.Mock).toHaveBeenCalledWith(
        `/api/lens/index_stats/my-fake-index-pattern`,
        {
          body: JSON.stringify({
            query: { match_all: {} },
            earliest: 'now-7d',
            latest: 'now',
            size: 500,
            timeFieldName: 'timestamp',
            fields: [
              {
                name: 'timestamp',
                type: 'date',
              },
              {
                name: 'bytes',
                type: 'number',
              },
              {
                name: 'memory',
                type: 'number',
              },
              {
                name: 'unsupported',
                type: 'geo',
              },
              {
                name: 'source',
                type: 'string',
              },
            ],
          }),
        }
      );

      expect(updateFields).toHaveBeenCalledWith('1', [
        {
          name: 'timestamp',
          type: 'date',
          exists: true,
          cardinality: 500,
          count: 500,
          aggregatable: true,
          searchable: true,
        },
        ...defaultProps.indexPatterns['1'].fields
          .slice(1)
          .map(field => ({ ...field, exists: false })),
      ]);
    });

    it('does not attempt to load existence data if the index pattern has it', async () => {
      const updateFields = jest.fn();
      const newIndexPatterns = {
        ...defaultProps.indexPatterns,
        '1': {
          ...defaultProps.indexPatterns['1'],
          hasExistence: true,
        },
      };

      const props = { ...defaultProps, indexPatterns: newIndexPatterns };

      mount(<InnerIndexPatternDataPanel {...props} updateFieldsWithCounts={updateFields} />);

      await waitForPromises();

      expect(npStartMock.core.http.post as jest.Mock).not.toHaveBeenCalled();
    });
  });

  describe('while showing empty fields', () => {
    it('should list all supported fields in the pattern sorted alphabetically', async () => {
      const wrapper = shallow(
        <InnerIndexPatternDataPanel {...defaultProps} showEmptyFields={true} />
      );

      expect(wrapper.find(FieldItem).map(fieldItem => fieldItem.prop('field').name)).toEqual([
        'bytes',
        'memory',
        'source',
        'timestamp',
      ]);
    });

    it('should filter down by name', async () => {
      const wrapper = shallow(
        <InnerIndexPatternDataPanel {...defaultProps} showEmptyFields={true} />
      );

      act(() => {
        wrapper.find(EuiFieldSearch).prop('onChange')!({ target: { value: 'mem' } } as ChangeEvent<
          HTMLInputElement
        >);
      });

      expect(wrapper.find(FieldItem).map(fieldItem => fieldItem.prop('field').name)).toEqual([
        'memory',
      ]);
    });

    it('should filter down by type', async () => {
      const wrapper = shallow(
        <InnerIndexPatternDataPanel {...defaultProps} showEmptyFields={true} />
      );

      act(() => {
        (wrapper
          .find(EuiContextMenuPanel)
          .prop('items')!
          .find(
            item => (item as ReactElement).props['data-test-subj'] === 'typeFilter-number'
          )! as ReactElement).props.onClick();
      });

      expect(wrapper.find(FieldItem).map(fieldItem => fieldItem.prop('field').name)).toEqual([
        'bytes',
        'memory',
      ]);
    });

    it('should toggle type if clicked again', async () => {
      const wrapper = shallow(
        <InnerIndexPatternDataPanel {...defaultProps} showEmptyFields={true} />
      );

      act(() => {
        (wrapper
          .find(EuiContextMenuPanel)
          .prop('items')!
          .find(
            item => (item as ReactElement).props['data-test-subj'] === 'typeFilter-number'
          )! as ReactElement).props.onClick();
      });

      act(() => {
        (wrapper
          .find(EuiContextMenuPanel)
          .prop('items')!
          .find(
            item => (item as ReactElement).props['data-test-subj'] === 'typeFilter-number'
          )! as ReactElement).props.onClick();
      });

      expect(wrapper.find(FieldItem).map(fieldItem => fieldItem.prop('field').name)).toEqual([
        'bytes',
        'memory',
        'source',
        'timestamp',
      ]);
    });

    it('should filter down by type and by name', async () => {
      const wrapper = shallow(
        <InnerIndexPatternDataPanel {...defaultProps} showEmptyFields={true} />
      );

      act(() => {
        wrapper.find(EuiFieldSearch).prop('onChange')!({ target: { value: 'mem' } } as ChangeEvent<
          HTMLInputElement
        >);
      });

      act(() => {
        (wrapper
          .find(EuiContextMenuPanel)
          .prop('items')!
          .find(
            item => (item as ReactElement).props['data-test-subj'] === 'typeFilter-number'
          )! as ReactElement).props.onClick();
      });

      expect(wrapper.find(FieldItem).map(fieldItem => fieldItem.prop('field').name)).toEqual([
        'memory',
      ]);
    });
  });

  describe('filtering out empty fields', () => {
    let emptyFieldsTestProps: typeof defaultProps;

    beforeEach(() => {
      emptyFieldsTestProps = {
        ...defaultProps,
        indexPatterns: {
          ...defaultProps.indexPatterns,
          '1': {
            ...defaultProps.indexPatterns['1'],
            hasExistence: true,
            fields: defaultProps.indexPatterns['1'].fields.map(field => ({
              ...field,
              exists: field.type === 'number',
            })),
          },
        },
        onToggleEmptyFields: jest.fn(),
      };
    });

    it('should list all supported fields in the pattern sorted alphabetically', async () => {
      const wrapper = shallow(<InnerIndexPatternDataPanel {...emptyFieldsTestProps} />);

      expect(wrapper.find(FieldItem).map(fieldItem => fieldItem.prop('field').name)).toEqual([
        'bytes',
        'memory',
      ]);
    });

    it('should filter down by name', async () => {
      const wrapper = shallow(
        <InnerIndexPatternDataPanel {...emptyFieldsTestProps} showEmptyFields={true} />
      );

      act(() => {
        wrapper.find(EuiFieldSearch).prop('onChange')!({ target: { value: 'mem' } } as ChangeEvent<
          HTMLInputElement
        >);
      });

      expect(wrapper.find(FieldItem).map(fieldItem => fieldItem.prop('field').name)).toEqual([
        'memory',
      ]);
    });

    it('should allow removing the filter for data', async () => {
      const wrapper = shallow(<InnerIndexPatternDataPanel {...emptyFieldsTestProps} />);

      act(() => {
        (wrapper
          .find(EuiContextMenuPanel)
          .prop('items')!
          .find(
            item => (item as ReactElement).props['data-test-subj'] === 'emptyFilter'
          )! as ReactElement).props.onClick();
      });

      expect(emptyFieldsTestProps.onToggleEmptyFields).toHaveBeenCalled();
    });
  });
});
