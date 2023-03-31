import ReactWiredInput, {
  InputProps,
} from '../../wired-elements/WiredInput.js';
import { useFieldContext } from '../Field.js';

export type NumberInputProps = Omit<InputProps, 'type'>;

export default function NumberInput(props: NumberInputProps) {
  const { id } = useFieldContext();
  return <ReactWiredInput {...props} id={id} type={'number'} />;
}
