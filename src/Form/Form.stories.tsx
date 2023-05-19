import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { ChangeEvent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Button from '../Button/Button.jsx';
import FileUploadInput from '../FileUpload/FileUpload.jsx';
import { Content, Header, Main, Page } from '../Layout/Layout.jsx';
import Link from '../Link/Link.jsx';
import NumberInput from '../NumberInput/NumberInput.jsx';
import SliderInput from '../Slider/Slider.jsx';
import { Field } from './Field.jsx';
import Label from './Label.jsx';

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
      await expect(JSON.parse(formValues)).toEqual({ height: '10', rating: 0 });
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
                    <Field
                      {...field}
                      className={'tw-flex tw-flex-row tw-gap-0.5'}
                    >
                      <Label>Height</Label>
                      <NumberInput
                        data-testid={'form-stories-number-input'}
                        startAdornment={'cm'}
                      />
                    </Field>
                  );
                }}
              />
              <Controller
                control={control}
                name={'proofOfAge'}
                render={({ field }) => {
                  const { onChange, value, ...hookFormFieldProps } = field;
                  const uploadFileWhenInputChanged = (
                    event: ChangeEvent<HTMLInputElement>,
                  ) => {
                    if (!event.target.files) return;
                    const [uploadFile]: FileList = event.target.files;
                    const reader = new FileReader();
                    reader.addEventListener(
                      'load',
                      () => {
                        onChange({
                          name: uploadFile.name,
                          url: reader.result as string,
                        });
                      },
                      false,
                    );
                    reader.readAsDataURL(uploadFile);
                  };
                  return (
                    <>
                      <Field
                        {...hookFormFieldProps}
                        className={'tw-flex tw-flex-row tw-gap-0.5'}
                        onChange={uploadFileWhenInputChanged}
                        value={value}
                      >
                        <Label>Click to upload proof</Label>
                        <FileUploadInput
                          data-testid={'form-stories-upload-input'}
                        >
                          Upload Proof
                        </FileUploadInput>
                      </Field>
                      {value?.url && (
                        <Link href={value?.url}>{value?.name}</Link>
                      )}
                    </>
                  );
                }}
              />
              <Controller
                control={control}
                defaultValue={0}
                name={'rating'}
                render={({ field }) => {
                  return (
                    <Field
                      className={
                        'tw-flex tw-flex-row tw-items-center tw-gap-1.5'
                      }
                      {...field}
                    >
                      <Label>Rating</Label>
                      <SliderInput data-testid={'form-stories-slider-input'} />
                    </Field>
                  );
                }}
              />
              <Button
                data-testid={'form-stories-submit-button'}
                type={'submit'}
              >
                Submit
              </Button>
            </form>
          </Main>
        </Content>
      </Page>
    );
  },
};
