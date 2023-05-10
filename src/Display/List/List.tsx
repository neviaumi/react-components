import React from 'react';

import { useFieldContext } from '../../Input/Field.jsx';

export default function List(props: React.HTMLAttributes<HTMLUListElement>) {
  const { id } = useFieldContext();
  return <ul id={id} {...props} />;
}
