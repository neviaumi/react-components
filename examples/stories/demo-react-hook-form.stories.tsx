import { Button } from '@busybox/react-components/Button';
import { DateInput } from '@busybox/react-components/DateInput';
import { Field } from '@busybox/react-components/Field';
import { FileUploadInput } from '@busybox/react-components/FileUploadInput';
import { Label } from '@busybox/react-components/Label';
import { Content, Header, Main, Page } from '@busybox/react-components/Layout';
import { Link } from '@busybox/react-components/Link';
import { NumberInput } from '@busybox/react-components/NumberInput';
import { Radio, RadioGroup } from '@busybox/react-components/RadioGroup';
import { Select, SelectOption } from '@busybox/react-components/Select';
import { Slider } from '@busybox/react-components/Slider';
import { TextInput } from '@busybox/react-components/TextInput';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import {
  fireEvent,
  userEvent,
  waitFor,
  within,
} from '@storybook/testing-library';
import { type ChangeEvent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const meta: Meta = {
  title: 'Demo/React hook form',
};

export default meta;

type Story = StoryObj;

export const CarSearchForm: Story = {
  play: async ({ canvasElement, step }) => {
    const result = {
      carBrand: 'Toyota',
      doors: '5',
      model: 'Yaris',
      rating: 3,
      transmission: 'manual',
    };
    const canvas = within(canvasElement);
    await step('Filling the form', async () => {
      await userEvent.click(canvas.getByTestId('form-stories-select-input'));
      const optionToyota = await within(document.body)
        .findByTestId('form-stories-select-options')
        .then(ele => ele.querySelector(`[data-value="${result.carBrand}"]`));
      expect(optionToyota).not.toBeNull();
      await userEvent.click(optionToyota!);
      await userEvent.type(canvas.getByLabelText('Doors'), result.doors);
      await userEvent.type(canvas.getByLabelText('Model'), result.model);
      await userEvent.click(canvas.getByLabelText('Manual'));
    });

    await step('Form submit', async () => {
      await userEvent.click(
        canvas.getByRole('button', {
          name: 'Submit',
        }),
      );
      await waitFor(async () => {
        const formValues = canvas.getByTestId('form-values').textContent || '';
        expect(JSON.parse(formValues)).toEqual(result);
      });
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
                      <Select
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
                      </Select>
                    </Field>
                  );
                }}
              />
              <Controller
                control={control}
                name={'model'}
                render={({ field }) => {
                  return (
                    <Field
                      {...field}
                      className={'tw-flex tw-flex-col tw-gap-0.5'}
                    >
                      <Label>Model</Label>
                      <TextInput data-testid={'form-stories-text-input'} />
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
                      {...field}
                      className={'tw-flex tw-flex-col tw-gap-0.5'}
                    >
                      <label>Transmission</label>
                      <RadioGroup>
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
                      {...field}
                      className={'tw-flex tw-flex-col tw-gap-0.5'}
                    >
                      <div className={'tw-flex tw-flex-row tw-gap-1'}>
                        <Label>Rating</Label>
                        <span className={'tw-font-bold'}>{field.value}</span>
                      </div>
                      <Slider
                        data-testid={'form-stories-slider-input'}
                        max={5}
                        min={1}
                      />
                    </Field>
                  );
                }}
              />

              <Button
                className={'tw-mt-2'}
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

export const CarInsuranceRegisterForm: Story = {
  play: async ({ canvasElement, step }) => {
    const result = {
      drivingLicence: {
        name: 'testing.png',
      },
      effectiveDate: '2021-01-01',
    };
    const canvas = within(canvasElement);
    await step('Filling the form', async () => {
      await userEvent.upload(
        canvas.getByTestId('form-stories-file-upload-raw-upload-input'),
        [
          new File(['123'], result.drivingLicence.name, {
            type: 'image/png',
          }),
        ],
      );
      fireEvent.change(canvas.getByLabelText('Effective Date'), {
        target: {
          value: result.effectiveDate,
        },
      });
    });
    await step('Form submit', async () => {
      await userEvent.click(
        canvas.getByRole('button', {
          name: 'Submit',
        }),
      );
      await waitFor(async () => {
        const formValues = JSON.parse(
          canvas.getByTestId('form-values').textContent || '',
        );
        expect(formValues.drivingLicence.name).toEqual(
          result.drivingLicence.name,
        );
        expect(formValues.effectiveDate).toEqual(result.effectiveDate);
      });
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
                name={'drivingLicence'}
                render={({ field }) => {
                  const { onChange, ref, value, ...hookFormFieldProps } = field;
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
                        ref={ref}
                        value={value}
                      >
                        <Label>Driving Licence</Label>
                        <FileUploadInput
                          className={'tw-items-center tw-justify-center'}
                          data-testid={'form-stories-file-upload'}
                        >
                          Upload
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
                defaultValue={new Date().toISOString().split('T')[0]}
                name={'effectiveDate'}
                render={({ field: { onChange, ...field } }) => {
                  return (
                    <Field
                      onChange={onChange}
                      {...field}
                      className={'tw-flex tw-flex-col tw-gap-0.5'}
                    >
                      <Label>Effective Date</Label>
                      <DateInput data-testid={'form-stories-date-input'} />
                    </Field>
                  );
                }}
              />
              <Button
                className={'tw-mt-2'}
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
