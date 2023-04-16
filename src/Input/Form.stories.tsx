import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Button from '../Button/Button';
import { Content, Header, Main, Page } from '../Layout/Layout';
import { Field } from './Field.js';
import Label from './Label.js';
import NumberInput from './NumberInput/NumberInput';

const meta: Meta = {
  title: 'Demo/Form',
};

export default meta;

type Story = StoryObj;

export const ReactHookForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('Height'), '10');
    await userEvent.click(
      canvas.getByRole('button', {
        name: 'Submit',
      }),
    );
    await waitFor(async () => {
      const formValues = canvas.getByTestId('form-values').textContent || '';
      await expect(JSON.parse(formValues)).toEqual({ height: '10' });
    });
  },
  render: () => {
    const { control, handleSubmit } = useForm();
    const [formValues, submitFormValues] = useState({});
    return (
      <Page>
        <Header>
          <pre data-testid={'form-values'}>
            {JSON.stringify(formValues, null, 4)}
          </pre>
        </Header>
        <Content>
          <Main>
            <form onSubmit={handleSubmit(submitFormValues)}>
              <Controller
                control={control}
                name={'height'}
                render={({ field }) => {
                  return (
                    <Field {...field}>
                      <Label>Height</Label>
                      <NumberInput startAdornment={'cm'} />
                    </Field>
                  );
                }}
              />
              <Button type={'submit'}>Submit</Button>
            </form>
          </Main>
        </Content>
      </Page>
    );
  },
};
