import { Button } from '@busybox/react-components/Button';
import { DateInput } from '@busybox/react-components/DateInput';
import { Field } from '@busybox/react-components/FormField/Field';
import { FieldErrorMessage } from '@busybox/react-components/FormField/FieldErrorMessage';
import { FileUploadInput } from '@busybox/react-components/FileUploadInput';
import { Label } from '@busybox/react-components/FormField/Label';
import { Content, Header, Main, Page } from '@busybox/react-components/Layout';
import { Link } from '@busybox/react-components/Link';
import { NumberInput } from '@busybox/react-components/NumberInput';
import { Radio, RadioGroup } from '@busybox/react-components/RadioGroup';
import { Select, SelectOption } from '@busybox/react-components/Select';
import { Slider } from '@busybox/react-components/Slider';
import { TextInput } from '@busybox/react-components/TextInput';
import { withCheckNewValueIsNotEqual } from '@busybox/react-components/utils/with-check-new-value-is-not-equal';
import { Skeleton } from '@busybox/react-components/Skeleton';
import clsx from 'clsx';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import {
  fireEvent,
  userEvent,
  waitFor,
  within,
} from '@storybook/testing-library';
import {
  type ChangeEvent,
  type PropsWithChildren,
  type ReactElement,
  useState,
} from 'react';
import {
  Controller,
  useForm,
  useFormContext,
  FormProvider,
} from 'react-hook-form';

const meta: Meta = {
  title: 'Demo/React hook form',
};

export default meta;

type Story = StoryObj;

function FieldInput({
  children,
  skeleton,
}: PropsWithChildren<{
  skeleton: ReactElement;
}>) {
  const { formState } = useFormContext();

  if (formState.isSubmitting) {
    return skeleton;
  } else return children;
}

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
      await step('Select car brand from select dropdown', async () => {
        await userEvent.click(
          canvas.getByRole('combobox', {
            name: 'Car Brand',
          }),
        );
        await userEvent.click(
          within(
            await within(document.body).findByRole('listbox', {
              name: 'carBrand options',
            }),
          ).getByRole('option', {
            name: result.carBrand,
          }),
        );
      });

      await userEvent.type(
        canvas.getByRole('textbox', {
          name: 'Model',
        }),
        result.model,
      );
      await userEvent.click(
        canvas.getByRole('radio', {
          name: 'Manual',
        }),
      );
      await userEvent.type(
        canvas.getByRole('spinbutton', { name: 'Doors' }),
        result.doors,
      );
      const slider = canvas.getByRole('slider', {
        hidden: true,
        name: 'Rating',
      });
      fireEvent.change(slider, { target: { value: result.rating.toString() } });
    });

    await step('Form submit', async () => {
      await userEvent.click(
        canvas.getByRole('button', {
          name: 'Submit',
        }),
      );
      await waitFor(async () => {
        const formValues =
          (await canvas.findByTestId('form-values')).textContent || '';
        expect(JSON.parse(formValues)).toEqual(result);
      });
    });
  },
  render: () => {
    const methods = useForm({
      mode: 'onChange',
      shouldUseNativeValidation: true,
    });
    const { control, handleSubmit, formState } = methods;
    const [formValues, submitFormValues] = useState({});
    const { isSubmitting, isSubmitted } = formState;
    return (
      <Page>
        <Header>
          {isSubmitted && (
            <pre data-testid={'form-values'}>
              {JSON.stringify(formValues, null, 4)}
            </pre>
          )}
        </Header>
        <Content>
          <Main>
            <FormProvider {...methods}>
              <form
                noValidate
                className={'tw-flex tw-flex-col tw-justify-start tw-gap-2'}
                onSubmit={handleSubmit(async values => {
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  submitFormValues(values);
                })}
              >
                <Controller
                  control={control}
                  name={'carBrand'}
                  render={({ field, fieldState, formState }) => {
                    const { disabled, name, onBlur, onChange, ref, value } =
                      field;
                    const { invalid, isDirty, error } = fieldState;
                    const { isSubmitted } = formState;
                    const shouldShowAsError = isSubmitted || isDirty;
                    return (
                      <Field
                        className={'tw-relative tw-flex tw-flex-col tw-gap-0.5'}
                        disabled={disabled}
                        error={invalid}
                        name={name}
                        onBlur={onBlur}
                        onChange={withCheckNewValueIsNotEqual(value)(onChange)}
                        value={value}
                        required
                      >
                        <Label
                          className={clsx(
                            shouldShowAsError
                              ? 'group-invalid:tw-text-error'
                              : 'group-invalid:tw-text-warning',
                            'after:tw-content-["_*"]',
                          )}
                        >
                          Car Brand
                        </Label>
                        <FieldInput
                          skeleton={<Skeleton className={'tw-h-5 tw-w-30'} />}
                        >
                          <Select
                            data-testid={'form-stories-select-input'}
                            placeholder={'Select car brand'}
                            ref={ref}
                            slotProps={{
                              listbox: {
                                className: 'tw-w-30',
                                'data-testid': 'form-stories-select-options',
                              },
                              root: {
                                className: clsx(
                                  'tw-h-5 tw-w-30',
                                  shouldShowAsError
                                    ? 'group-invalid:tw-border-error group-invalid:tw-text-error'
                                    : 'group-invalid:tw-border-warning group-invalid:tw-text-warning',
                                ),
                              },
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
                        </FieldInput>
                        <FieldErrorMessage className={'tw-text-error'}>
                          {error?.message}
                        </FieldErrorMessage>
                      </Field>
                    );
                  }}
                  rules={{ required: 'Car brand must be selected' }}
                />
                <Controller
                  control={control}
                  name={'model'}
                  render={({ field, fieldState, formState }) => {
                    const { disabled, name, onBlur, onChange, ref, value } =
                      field;
                    const { invalid, isDirty, error } = fieldState;
                    const { isSubmitted } = formState;
                    const shouldShowAsError = isSubmitted || isDirty;
                    return (
                      <Field
                        className={'tw-flex tw-flex-col tw-gap-0.5'}
                        disabled={disabled}
                        error={invalid}
                        name={name}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        required
                      >
                        <Label
                          className={clsx(
                            shouldShowAsError
                              ? 'group-invalid:tw-text-error'
                              : 'group-invalid:tw-text-warning',
                            'after:tw-content-["_*"]',
                          )}
                        >
                          Model
                        </Label>
                        <FieldInput
                          skeleton={<Skeleton className={'tw-h-5 tw-w-full'} />}
                        >
                          <TextInput
                            data-testid={'form-stories-text-input'}
                            className={'tw-h-5'}
                            slotProps={{
                              input: {
                                className: clsx(
                                  shouldShowAsError
                                    ? 'invalid:tw-border-error'
                                    : 'invalid:tw-border-warning',
                                ),
                              },
                            }}
                            ref={ref}
                          />
                        </FieldInput>
                        <FieldErrorMessage className={'tw-text-error'}>
                          {error?.message}
                        </FieldErrorMessage>
                      </Field>
                    );
                  }}
                  rules={{
                    required: 'Model is required',
                    validate: value => {
                      if (value.length < 5)
                        return 'Model can not be less than 5 characters';
                      return true;
                    },
                  }}
                />
                <Controller
                  control={control}
                  name={'transmission'}
                  render={({ field, fieldState }) => {
                    const { disabled, name, onBlur, onChange, ref, value } =
                      field;
                    const { invalid, isDirty, error } = fieldState;
                    const shouldShowAsError = isSubmitted || isDirty;

                    return (
                      <Field
                        className={'tw-flex tw-flex-col tw-gap-0.5'}
                        disabled={disabled}
                        error={invalid}
                        name={name}
                        onBlur={onBlur}
                        onChange={onChange}
                        role={'radiogroup'}
                        value={value}
                        required
                      >
                        <Label
                          className={clsx(
                            shouldShowAsError
                              ? 'group-invalid:tw-text-error'
                              : 'group-invalid:tw-text-warning',
                            'after:tw-content-["_*"]',
                          )}
                          htmlFor={undefined}
                        >
                          Transmission
                        </Label>
                        <FieldInput
                          skeleton={<Skeleton className={'tw-h-5 tw-w-full'} />}
                        >
                          <RadioGroup>
                            <Radio
                              data-testid={'form-stories-radio-input-option-1'}
                              id={'auto'}
                              ref={ref}
                              value={'automatic'}
                              className={clsx(
                                shouldShowAsError
                                  ? 'group-invalid:tw-border-error group-invalid:tw-text-error'
                                  : 'group-invalid:tw-border-warning group-invalid:tw-text-warning',
                                'group-invalid:tw-border-l-8 group-invalid:tw-pl-0.5',
                                'group-focus:tw-border group-focus:tw-border-primary-user-action',
                              )}
                              slotProps={{
                                label: {
                                  className:
                                    'group-focus:tw-ring-primary group-focus:tw-ring-2',
                                },
                              }}
                            >
                              Automatic
                            </Radio>
                            <Radio
                              data-testid={'form-stories-radio-input-option-2'}
                              id={'manual'}
                              value={'manual'}
                              className={clsx(
                                shouldShowAsError
                                  ? 'group-invalid:tw-border-error group-invalid:tw-text-error'
                                  : 'group-invalid:tw-border-warning group-invalid:tw-text-warning',
                                'group-invalid:tw-border-l-8 group-invalid:tw-pl-0.5',
                              )}
                              slotProps={{
                                // input: {
                                //   className: 'focus-visible:tw-outline-primary'
                                // },
                                label: {
                                  className:
                                    'group-focus:tw-ring-primary group-focus:tw-ring-2',
                                },
                              }}
                            >
                              Manual
                            </Radio>
                          </RadioGroup>
                        </FieldInput>
                        <FieldErrorMessage className={'tw-text-error'}>
                          {error?.message}
                        </FieldErrorMessage>
                      </Field>
                    );
                  }}
                  rules={{ required: 'Transmission muse be selected' }}
                />
                <Controller
                  control={control}
                  name={'doors'}
                  render={({ field, fieldState, formState }) => {
                    const { disabled, name, onBlur, onChange, ref, value } =
                      field;
                    const { invalid, isDirty, error } = fieldState;
                    const { isSubmitted } = formState;
                    const shouldShowAsError = isSubmitted || isDirty;
                    return (
                      <Field
                        className={'tw-flex tw-flex-col tw-gap-0.5'}
                        disabled={disabled}
                        error={invalid}
                        name={name}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        required
                      >
                        <Label
                          className={clsx(
                            shouldShowAsError
                              ? 'group-invalid:tw-text-error'
                              : 'group-invalid:tw-text-warning',
                            'after:tw-content-["_*"]',
                          )}
                        >
                          Doors
                        </Label>
                        <FieldInput
                          skeleton={<Skeleton className={'tw-h-5 tw-w-full'} />}
                        >
                          <NumberInput
                            data-testid={'form-stories-number-input'}
                            ref={ref}
                            slotProps={{
                              input: {
                                max: 5,
                                min: 2,
                                className: shouldShowAsError
                                  ? 'invalid:tw-border-error'
                                  : 'invalid:tw-border-warning',
                              },
                            }}
                          />
                        </FieldInput>
                        <FieldErrorMessage className={'tw-text-error'}>
                          {error?.message}
                        </FieldErrorMessage>
                      </Field>
                    );
                  }}
                  rules={{
                    max: {
                      message: 'Door can not be more than 5',
                      value: 5,
                    },
                    min: {
                      message: 'Door can less than 2',
                      value: 1,
                    },
                    required: 'Number of Door muse be specified',
                  }}
                />
                <Controller
                  control={control}
                  name={'rating'}
                  render={({ field, fieldState, formState }) => {
                    const { disabled, name, onBlur, onChange, ref, value } =
                      field;
                    const { invalid, isDirty, error } = fieldState;
                    const { isSubmitted } = formState;
                    const isError = invalid || !value;
                    const shouldShowAsError = isSubmitted || isDirty;
                    return (
                      <Field
                        className={'tw-flex tw-flex-col tw-gap-0.5'}
                        disabled={disabled}
                        error={invalid}
                        name={name}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        required
                      >
                        <div className={'tw-flex tw-flex-row'}>
                          <Label
                            className={clsx(
                              isError &&
                                (shouldShowAsError
                                  ? 'tw-text-error'
                                  : 'tw-text-warning'),
                              'after:tw-content-["_*"]',
                            )}
                          >
                            Rating
                          </Label>
                          <span className={'tw-ml-1 tw-font-bold'}>
                            {field.value}
                          </span>
                        </div>
                        <FieldInput
                          skeleton={<Skeleton className={'tw-h-5 tw-w-full'} />}
                        >
                          <Slider
                            data-testid={'form-stories-slider-input'}
                            max={5}
                            min={1}
                            ref={ref}
                            slotProps={{
                              thumb: {
                                className: clsx(
                                  isError &&
                                    (shouldShowAsError
                                      ? 'tw-border-error tw-bg-error'
                                      : 'tw-border-warning tw-bg-warning'),
                                ),
                              },
                            }}
                          />
                          <FieldErrorMessage className={'tw-text-error'}>
                            {error?.message}
                          </FieldErrorMessage>
                        </FieldInput>
                      </Field>
                    );
                  }}
                  rules={{ required: 'Rating must be specified' }}
                />

                <Button
                  className={
                    'tw-mt-2 disabled:tw-border-disabled disabled:tw-bg-disabled'
                  }
                  data-testid={'form-stories-submit-button'}
                  type={'submit'}
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </form>
            </FormProvider>
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
    const { control, handleSubmit } = useForm({
      mode: 'onChange',
      shouldUseNativeValidation: true,
    });
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
                render={({ field, fieldState, formState }) => {
                  const { disabled, name, onBlur, onChange, ref, value } =
                    field;
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
                        className={'tw-flex tw-flex-col tw-gap-0.5'}
                        disabled={disabled}
                        error={fieldState.invalid}
                        name={name}
                        onBlur={onBlur}
                        onChange={uploadFileWhenInputChanged}
                        value={value}
                      >
                        <Label className={'group-invalid:tw-text-error'}>
                          Driving Licence
                        </Label>
                        <FileUploadInput
                          className={'tw-items-center tw-justify-center'}
                          data-testid={'form-stories-file-upload'}
                          ref={ref}
                        >
                          Upload
                        </FileUploadInput>
                        <FieldErrorMessage className={'tw-text-error'}>
                          {fieldState.error?.message}
                        </FieldErrorMessage>
                      </Field>
                      {value?.url && (
                        <Link href={value?.url}>{value?.name}</Link>
                      )}
                    </>
                  );
                }}
                rules={{
                  required: 'You have to upload your driving licence',
                }}
              />
              <Controller
                control={control}
                name={'effectiveDate'}
                render={({ field, fieldState, formState }) => {
                  const { disabled, name, onBlur, onChange, ref, value } =
                    field;
                  return (
                    <Field
                      className={'tw-flex tw-flex-col tw-gap-0.5'}
                      disabled={disabled}
                      error={fieldState.invalid}
                      name={name}
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    >
                      <Label className={'group-invalid:tw-text-error'}>
                        Effective Date
                      </Label>
                      <DateInput
                        data-testid={'form-stories-date-input'}
                        ref={ref}
                      />
                      <FieldErrorMessage className={'tw-text-error'}>
                        {fieldState.error?.message}
                      </FieldErrorMessage>
                    </Field>
                  );
                }}
                rules={{ required: 'Effective date must be specified' }}
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
