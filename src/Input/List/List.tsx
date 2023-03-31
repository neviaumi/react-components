import ReactWiredListbox, {
  ListboxProps,
} from '../../wired-elements/WiredListbox.js';
import { useFieldContext } from '../Field.js';

export default function List(props: ListboxProps) {
  const { id } = useFieldContext();
  return <ReactWiredListbox id={id} {...props} />;
}
