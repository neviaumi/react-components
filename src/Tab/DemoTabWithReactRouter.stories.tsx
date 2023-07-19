import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { omit } from 'ramda';
import { forwardRef, useMemo } from 'react';
import {
  createBrowserRouter,
  Link,
  type LinkProps,
  matchPath,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom';

import Tabs, {
  Tab,
  type TabProps,
  TabsList,
  type TabSlotProps,
} from './Tab.tsx';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Demo/React Router',
};

export default meta;

type Story = StoryObj<typeof Tabs>;

function useCurrentPathMatchingPatterns(patterns: string[]) {
  const { pathname } = useLocation();
  const patternsLength = patterns.length;
  return useMemo(() => {
    if (patternsLength === 0) return false;
    const firstMatchPattern = patterns.find(
      pattern => matchPath(pattern, pathname) !== null,
    );
    return firstMatchPattern !== undefined;
  }, [pathname, patterns, patternsLength]);
}

export const DemoTabStory: Story = {
  name: 'Vehicle list',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Default on Car list', async () => {
      await expect(canvas.findByTestId('test-path')).resolves.toHaveTextContent(
        '/cars',
      );
      expect(canvas.getByTestId('test-tab-0')).toHaveAttribute(
        'aria-selected',
        'true',
      );
    });
    await step('Navigate to Car 1', async () => {
      await userEvent.click(canvas.getByTestId('test-link-to-car-1'));
      expect(canvas.getByTestId('test-path')).toHaveTextContent('/car/1');
      await expect(canvas.findByTestId('test-tab-0')).resolves.toHaveAttribute(
        'aria-selected',
        'true',
      );
      await expect(canvas.findByTestId('test-car-1')).resolves.toBeVisible();
    });

    await step('Navigate to motorcycles list', async () => {
      await userEvent.click(canvas.getByTestId('test-tab-1'));
      expect(canvas.getByTestId('test-path')).toHaveTextContent('/motorcycles');
      await expect(canvas.findByTestId('test-tab-1')).resolves.toHaveAttribute(
        'aria-selected',
        'true',
      );
    });

    await step('Navigate to Motorcycle 1', async () => {
      await userEvent.click(canvas.getByTestId('test-link-to-motorcycle-1'));
      expect(canvas.getByTestId('test-path')).toHaveTextContent(
        '/motorcycle/1',
      );
      await expect(canvas.findByTestId('test-tab-1')).resolves.toHaveAttribute(
        'aria-selected',
        'true',
      );
      await expect(
        canvas.findByTestId('test-motorcycle-1'),
      ).resolves.toBeVisible();
    });
  },
  render: () => {
    const LinkWithTab = forwardRef<
      HTMLAnchorElement,
      TabSlotProps['root'] & LinkProps
    >(function LinkWithTab(props, ref) {
      const linkProps = omit(['ownerState'], props);
      return <Link {...linkProps} ref={ref} />;
    });

    function TabWithMultipleValue({
      value: patterns,
      ...rest
    }: Omit<TabProps, 'value'> &
      LinkProps & {
        value: string[];
      }) {
      const { pathname } = useLocation();
      const isCurrentPathMatchingPatterns =
        useCurrentPathMatchingPatterns(patterns);
      return (
        <Tab
          slots={{ root: LinkWithTab }}
          value={isCurrentPathMatchingPatterns ? pathname : -1}
          {...rest}
        />
      );
    }

    function Root() {
      const { pathname } = useLocation();

      return (
        <Tabs value={pathname}>
          <div data-testid={'test-path'}>Match Pattern: {pathname}</div>
          <TabsList>
            <TabWithMultipleValue
              data-testid={'test-tab-0'}
              to={'/cars'}
              value={['/cars', '/car/:id']}
            >
              Cars
            </TabWithMultipleValue>
            <TabWithMultipleValue
              data-testid={'test-tab-1'}
              to={'/motorcycles'}
              value={['/motorcycles', '/motorcycle/:id']}
            >
              Motorcycles
            </TabWithMultipleValue>
          </TabsList>
          <Outlet />
        </Tabs>
      );
    }

    const router = createBrowserRouter([
      {
        children: [
          {
            element: (
              <div>
                List cars!
                <div>
                  <Link data-testid={'test-link-to-car-1'} to={'/car/1'}>
                    Car 1
                  </Link>
                </div>
              </div>
            ),
            path: '/cars',
          },
          {
            element: <div data-testid={'test-car-1'}>car 1</div>,
            path: '/car/:id',
          },
          {
            element: (
              <div>
                List motorcycles!
                <div>
                  <Link
                    data-testid={'test-link-to-motorcycle-1'}
                    to={'/motorcycle/1'}
                  >
                    Motorcycle 1
                  </Link>
                </div>
              </div>
            ),
            path: '/motorcycles',
          },
          {
            element: <div data-testid={'test-motorcycle-1'}>Motorcycle 1</div>,
            path: '/motorcycle/:id',
          },
        ],
        element: <Root />,
      },
      {
        element: <Navigate to={'/cars'} />,
        path: '*',
      },
    ]);
    return <RouterProvider router={router} />;
  },
};
