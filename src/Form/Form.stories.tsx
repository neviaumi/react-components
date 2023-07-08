import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { screen, userEvent, waitFor, within } from '@storybook/testing-library';
import { ChangeEvent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Button from '../Button/Button.jsx';
import FileUploadInput from '../FileUpload/FileUpload.jsx';
import { Content, Header, Main, Page } from '../Layout/Layout.jsx';
import Link from '../Link/Link.jsx';
import NumberInput from '../NumberInput/NumberInput.jsx';
import RadioGroup, { Radio } from '../RadioGroup/RadioGroup.jsx';
import SelectInput, { SelectOption } from '../Select/Select.jsx';
import SliderInput from '../Slider/Slider.jsx';
import { Field } from './Field.jsx';
import Label from './Label.jsx';

const meta: Meta = {
  title: 'Demo/Form',
};

export default meta;

type Story = StoryObj;

export const CarSearchForm: Story = {
  play: async ({ canvasElement }) => {
    const result = {
      carBrand: 'Toyota',
      doors: '5',
      rating: 3,
      transmission: 'manual',
    };
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('form-stories-select-input'));
    const optionToyota = await screen
      .findByTestId('form-stories-select-options')
      .then(ele => ele.querySelector(`[data-value="${result.carBrand}"]`));
    expect(optionToyota).not.toBeNull();
    await userEvent.click(optionToyota!);
    await userEvent.type(canvas.getByLabelText('Doors'), result.doors);
    await userEvent.click(canvas.getByLabelText('Manual'));
    await userEvent.click(
      canvas.getByRole('button', {
        name: 'Submit',
      }),
    );
    await waitFor(async () => {
      const formValues = canvas.getByTestId('form-values').textContent || '';
      await expect(JSON.parse(formValues)).toEqual(result);
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
            <form
              className={'tw-flex tw-flex-col tw-justify-start tw-gap-2'}
              onSubmit={handleSubmit(submitFormValues)}
            >
              <Controller
                control={control}
                name={'carBrand'}
                render={({ field }) => {
                  return (
                    <Field
                      {...field}
                      className={'tw-flex tw-flex-col tw-gap-0.5'}
                    >
                      <Label>Car Brand</Label>
                      <SelectInput
                        data-testid={'form-stories-select-input'}
                        name={field.name}
                        slotProps={{
                          listbox: {
                            className: 'tw-w-20',
                            'data-testid': 'form-stories-select-options',
                          },
                          root: { className: 'tw-h-5 tw-w-20' },
                        }}
                      >
                        <SelectOption
                          data-testid={'form-stories-select-option-1'}
                          value={'Toyota'}
                        >
                          Toyota
                        </SelectOption>
                        <SelectOption
                          data-testid={'form-stories-select-option-2'}
                          value={'BMW'}
                        >
                          BMW
                        </SelectOption>
                        <SelectOption
                          data-testid={'form-stories-select-option-3'}
                          value={'Honda'}
                        >
                          Honda
                        </SelectOption>
                        <SelectOption
                          data-testid={'form-stories-select-option-4'}
                          value={'Fiat'}
                        >
                          Fiat
                        </SelectOption>
                        <SelectOption
                          data-testid={'form-stories-select-option-5'}
                          value={'Mini'}
                        >
                          Mini
                        </SelectOption>
                      </SelectInput>
                    </Field>
                  );
                }}
              />
              <Controller
                control={control}
                name={'transmission'}
                render={({ field }) => {
                  return (
                    <Field
                      className={'tw-flex tw-flex-col tw-gap-0.5'}
                      {...field}
                    >
                      <label>Transmission</label>
                      <RadioGroup name={field.name}>
                        <Radio
                          data-testid={'form-stories-radio-input-option-1'}
                          id={'auto'}
                          value={'automatic'}
                        >
                          Automatic
                        </Radio>
                        <Radio
                          data-testid={'form-stories-radio-input-option-2'}
                          id={'manual'}
                          value={'manual'}
                        >
                          Manual
                        </Radio>
                      </RadioGroup>
                    </Field>
                  );
                }}
              />
              <Controller
                control={control}
                name={'doors'}
                render={({ field }) => {
                  return (
                    <Field
                      {...field}
                      className={'tw-flex tw-flex-col tw-gap-0.5'}
                    >
                      <Label>Doors</Label>
                      <NumberInput
                        data-testid={'form-stories-number-input'}
                        slotProps={{
                          input: {
                            max: 5,
                            min: 1,
                          },
                        }}
                      />
                    </Field>
                  );
                }}
              />
              <Controller
                control={control}
                defaultValue={3}
                name={'rating'}
                render={({ field }) => {
                  return (
                    <Field
                      className={'tw-flex tw-flex-col tw-gap-0.5'}
                      {...field}
                    >
                      <div className={'tw-flex tw-flex-row tw-gap-1'}>
                        <Label>Rating</Label>
                        <span className={'tw-font-bold'}>{field.value}</span>
                      </div>
                      <SliderInput
                        data-testid={'form-stories-slider-input'}
                        max={5}
                        min={1}
                      />
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

export const DriverRegisterForm: Story = {
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
            <form
              className={'tw-flex tw-flex-col tw-justify-start tw-gap-2'}
              onSubmit={handleSubmit(submitFormValues)}
            >
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
                        className={'tw-flex tw-flex-col tw-gap-0.5'}
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
