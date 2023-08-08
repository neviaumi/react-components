import React from 'react';

export default function List(props: React.HTMLAttributes<HTMLUListElement>) {
  return <ul {...props} />;
}

export function ListItem(props: React.HTMLAttributes<HTMLLIElement>) {
  return <li {...props} />;
}
