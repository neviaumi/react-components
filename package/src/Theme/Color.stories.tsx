import type { Meta, StoryObj } from '@storybook/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';

const meta: Meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Theme/Color',
};

export default meta;

type Story = StoryObj;

function Box({
  children,
  className,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={`tw-flex
          tw-h-40
          tw-items-center
          tw-justify-center
          tw-border ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export const Color: Story = {
  render: () => {
    return (
      <main className={`tw-flex tw-flex-col tw-gap-2`}>
        <section>
          <h1>Primary</h1>
          <div className={`tw-grid tw-grid-cols-2 tw-gap-1`}>
            <Box
              className={`
          tw-border-primary
          tw-bg-primary
          tw-text-primary-contrast
          hover:tw-border-primary-user-action
          hover:tw-bg-primary-user-action
          hover:tw-text-primary-user-action
            `}
            >
              Background
            </Box>
            <Box
              className={`
          tw-border-primary
          tw-text-primary
          hover:tw-border-primary-user-action
          hover:tw-text-primary-user-action
            `}
            >
              Foreground
            </Box>
          </div>
        </section>
        <section>
          <h1>Secondary</h1>
          <div className={`tw-grid tw-grid-cols-2 tw-gap-1`}>
            <Box
              className={`
          tw-border-secondary
          tw-bg-secondary
          tw-text-secondary-contrast
          hover:tw-border-secondary-user-action
          hover:tw-bg-secondary-user-action
          hover:tw-text-secondary-user-action
            `}
            >
              Background
            </Box>
            <Box
              className={`
          tw-border-secondary
          tw-text-secondary
          hover:tw-border-secondary-user-action
          hover:tw-text-secondary-user-action
            `}
            >
              Foreground
            </Box>
          </div>
        </section>
        <section>
          <h1>Warning</h1>
          <div className={`tw-grid tw-grid-cols-2 tw-gap-1`}>
            <Box
              className={`
          tw-border-warning
          tw-bg-warning
          tw-text-warning-contrast
          hover:tw-border-warning-user-action
          hover:tw-bg-warning-user-action
          hover:tw-text-warning-user-action
            `}
            >
              Background
            </Box>
            <Box
              className={`
          tw-border-warning
          tw-text-warning
          hover:tw-border-warning-user-action
          hover:tw-text-warning-user-action
            `}
            >
              Foreground
            </Box>
          </div>
        </section>
        <section>
          <h1>Error</h1>
          <div className={`tw-grid tw-grid-cols-2 tw-gap-1`}>
            <Box
              className={`
          tw-border-error
          tw-bg-error
          tw-text-error-contrast
          hover:tw-border-error-user-action
          hover:tw-bg-error-user-action
          hover:tw-text-error-user-action
            `}
            >
              Background
            </Box>
            <Box
              className={`
          tw-border-error
          tw-text-error
          hover:tw-border-error-user-action
          hover:tw-text-error-user-action
            `}
            >
              Foreground
            </Box>
          </div>
        </section>
        <section>
          <h1>Disabled</h1>
          <div className={`tw-grid tw-grid-cols-2 tw-gap-1`}>
            <Box
              className={`
          tw-cursor-not-allowed
          tw-items-center
          tw-justify-center
          tw-border
          tw-border-disabled
          tw-bg-disabled
          tw-text-disabled
            `}
            >
              Background
            </Box>
            <Box
              className={`
          tw-cursor-not-allowed
          tw-items-center
          tw-justify-center
          tw-border
          tw-border-disabled
          tw-text-disabled
            `}
            >
              Foreground
            </Box>
          </div>
        </section>
      </main>
    );
  },
};
