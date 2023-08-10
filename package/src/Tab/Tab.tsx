import {
  Tab as MuiTab,
  type TabOwnerState,
  type TabProps as MuiTabProps,
  type TabRootSlotProps,
} from '@mui/base/Tab';
import {
  TabPanel as MuiTabPanel,
  type TabPanelProps as MuiTabPanelProps,
  type TabPanelRootSlotProps as MuiTabPanelRootSlotProps,
} from '@mui/base/TabPanel';
import { Tabs as MuiTabs, type TabsProps } from '@mui/base/Tabs';
import {
  TabsList as MuiTabsList,
  type TabsListProps,
} from '@mui/base/TabsList';
import clsx from 'clsx';

import type { ComponentProps } from '../components.ts';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';

export type TabSlotProps = {
  root: TabRootSlotProps;
};
export type TabProps = ComponentProps<TabSlotProps, MuiTabProps>;
export function Tab({
  'data-testid': testId,
  disableDefaultClasses,
  slotProps: givenSlotProps,
  ...rest
}: TabProps) {
  let slotProps = givenSlotProps;

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<TabSlotProps>({
      slotWithDefaultClasses: {
        root: (state: TabOwnerState) =>
          state.selected
            ? clsx(
                'tw-cursor-default tw-border-primary tw-bg-primary tw-px-2 tw-py-1',
              )
            : clsx(
                'tw-border-primary tw-px-2 tw-py-1 hover:tw-cursor-pointer hover:tw-bg-primary-hover',
              ),
      },
    })(givenSlotProps);
  }
  const rootProps = mergeRootSlotPropsToComponentProps()(slotProps, rest);
  return (
    <MuiTab
      data-testid={testId ?? 'busybox-tab'}
      slotProps={slotProps}
      slots={{
        root: 'a',
      }}
      {...rootProps}
    />
  );
}

export function TabsList(props: TabsListProps) {
  return (
    <MuiTabsList
      slots={{
        root: 'nav',
      }}
      {...props}
    />
  );
}

export type TabPanelSlotProps = {
  root: MuiTabPanelRootSlotProps;
};
export type TabPanelProps = ComponentProps<TabPanelSlotProps, MuiTabPanelProps>;

export function TabPanel({ 'data-testid': testId, ...rest }: TabPanelProps) {
  return <MuiTabPanel data-testid={testId ?? 'busybox-tab-panel'} {...rest} />;
}

export default function Tabs(props: TabsProps) {
  return <MuiTabs {...props} />;
}
