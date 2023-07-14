import { cy, describe, it } from '@busybox/cypress';
import MuiButton, { ButtonOwnerState } from '@mui/base/Button/index.js';
import clsx from 'clsx';
import React, { useMemo } from 'react';

import { assocDefaultStyle } from './assign-default-style.ts';

describe('Assign default style', () => {
  it('default style can be empty object', () => {
    type TestbedProps = React.PropsWithChildren<{
      slotProps?: {
        root?: {
          className?: string;
        };
        title?: {
          className?: string;
        };
      };
    }>;
    function TestBed(props: TestbedProps) {
      const slotPropsWithDefaultValue = useMemo(() => {
        return assocDefaultStyle<Required<TestbedProps>['slotProps']>({
          slotWithDefaultClasses: {},
        })(props.slotProps);
      }, [props.slotProps]);
      return (
        <div {...slotPropsWithDefaultValue?.root} data-testid={'root'}>
          <h1 {...slotPropsWithDefaultValue?.title} data-testid={'title'}>
            Title
          </h1>
        </div>
      );
    }
    cy.mount(
      <TestBed
        slotProps={{
          root: {
            className: 'tw-border-2 tw-border-primary tw-px-2 tw-py-1',
          },
          title: {
            className: 'tw-font-bold tw-text-2xl tw-text-center',
          },
        }}
      />,
    );

    cy.findByTestId('root').should(
      'have.attr',
      'class',
      'tw-border-2 tw-border-primary tw-px-2 tw-py-1',
    );
    cy.findByTestId('title').should(
      'have.attr',
      'class',
      'tw-font-bold tw-text-2xl tw-text-center',
    );
  });

  describe('default value is string', () => {
    type TestbedProps = React.PropsWithChildren<{
      slotProps?: {
        root?: {
          className?: string;
        };
        title?: {
          className?: string;
        };
      };
    }>;
    function TestBed(props: TestbedProps) {
      const slotPropsWithDefaultValue = useMemo(() => {
        return assocDefaultStyle<Required<TestbedProps>['slotProps']>({
          slotWithDefaultClasses: {
            root: 'tw-bg-primary',
            title: 'tw-bg-secondary tw-text-secondary',
          },
        })(props.slotProps);
      }, [props.slotProps]);
      return (
        <div {...slotPropsWithDefaultValue?.root} data-testid={'root'}>
          <h1 {...slotPropsWithDefaultValue?.title} data-testid={'title'}>
            Title
          </h1>
        </div>
      );
    }
    it('add default className before given one', () => {
      cy.mount(
        <TestBed
          slotProps={{
            root: {
              className: 'tw-border-2 tw-border-primary tw-px-2 tw-py-1',
            },
            title: {
              className: ' tw-font-bold tw-text-2xl tw-text-center',
            },
          }}
        />,
      );

      cy.findByTestId('root').should(
        'have.attr',
        'class',
        'tw-bg-primary tw-border-2 tw-border-primary tw-px-2 tw-py-1',
      );
      cy.findByTestId('title').should(
        'have.attr',
        'class',
        'tw-bg-secondary tw-text-secondary tw-font-bold tw-text-2xl tw-text-center',
      );
    });
  });
  describe('default value is function ', () => {
    type TestbedProps = React.PropsWithChildren<{
      slotProps?: {
        button?: { className?: string } | ((state: ButtonOwnerState) => any);
        root?: {
          className?: string;
        };
        title?: {
          className?: string;
        };
      };
    }>;
    function TestBed(props: TestbedProps) {
      const slotPropsWithDefaultValue = useMemo(() => {
        return assocDefaultStyle<Required<TestbedProps>['slotProps']>({
          slotWithDefaultClasses: {
            button: (state: ButtonOwnerState) => {
              if (state.disabled) {
                return clsx('tw-bg-secondary tw-text-secondary');
              }
              return clsx(
                'tw-border-2',
                'tw-p-0.5',
                'tw-rounded-md',
                'tw-bg-primary',
                'tw-text-primary',
                'tw-border-primary',
                'hover:tw-border-primary-hover',
                'hover:tw-bg-primary-hover',
                'hover:tw-text-primary-hover',
              );
            },
            root: 'tw-bg-white',
            title: 'tw-bg-secondary tw-text-secondary',
          },
        })(props.slotProps);
      }, [props.slotProps]);
      return (
        <div {...slotPropsWithDefaultValue?.root} data-testid={'root'}>
          <h1 {...slotPropsWithDefaultValue?.title} data-testid={'title'}>
            Title
          </h1>
          <MuiButton
            data-testid={'button'}
            slotProps={{
              root: slotPropsWithDefaultValue?.button,
            }}
          >
            Button
          </MuiButton>
          <MuiButton
            data-testid={'button-disabled'}
            disabled={true}
            slotProps={{
              root: slotPropsWithDefaultValue?.button,
            }}
          >
            Disabled Button
          </MuiButton>
        </div>
      );
    }
    it('given state function has been used and default style has been append to className', () => {
      cy.mount(
        <TestBed
          slotProps={{
            button: (state: ButtonOwnerState) => ({
              className: state.disabled ? 'tw-text-disabled' : 'tw-text-2xl',
            }),
            root: {
              className: 'tw-border-2 tw-border-primary tw-px-2 tw-py-1',
            },
            title: {
              className: ' tw-font-bold tw-text-2xl tw-text-center',
            },
          }}
        />,
      );
      cy.findByTestId('root').should(
        'have.attr',
        'class',
        'tw-bg-white tw-border-2 tw-border-primary tw-px-2 tw-py-1',
      );
      cy.findByTestId('title').should(
        'have.attr',
        'class',
        'tw-bg-secondary tw-text-secondary tw-font-bold tw-text-2xl tw-text-center',
      );
      cy.findByTestId('button').should(
        'have.attr',
        'class',
        'MuiButton-root tw-border-2 tw-p-0.5 tw-rounded-md tw-bg-primary tw-text-primary tw-border-primary hover:tw-border-primary-hover hover:tw-bg-primary-hover hover:tw-text-primary-hover tw-text-2xl',
      );
      cy.findByTestId('button-disabled').should(
        'have.attr',
        'class',
        'MuiButton-root Mui-disabled tw-bg-secondary tw-text-secondary tw-text-disabled',
      );
    });
    it('state before given one', () => {
      cy.mount(
        <TestBed
          slotProps={{
            root: {
              className: 'tw-border-2 tw-border-primary tw-px-2 tw-py-1',
            },
            title: {
              className: ' tw-font-bold tw-text-2xl tw-text-center',
            },
          }}
        />,
      );

      cy.findByTestId('root').should(
        'have.attr',
        'class',
        'tw-bg-white tw-border-2 tw-border-primary tw-px-2 tw-py-1',
      );
      cy.findByTestId('title').should(
        'have.attr',
        'class',
        'tw-bg-secondary tw-text-secondary tw-font-bold tw-text-2xl tw-text-center',
      );
      cy.findByTestId('button').should(
        'have.attr',
        'class',
        'MuiButton-root tw-border-2 tw-p-0.5 tw-rounded-md tw-bg-primary tw-text-primary tw-border-primary hover:tw-border-primary-hover hover:tw-bg-primary-hover hover:tw-text-primary-hover',
      );

      cy.findByTestId('button-disabled').should(
        'have.attr',
        'class',
        'MuiButton-root Mui-disabled tw-bg-secondary tw-text-secondary',
      );
    });
  });
});
