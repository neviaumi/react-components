import React from 'react';

export function List(props: React.HTMLAttributes<HTMLUListElement>) {
  return <ul {...props} />;
}

export function ListItem(props: React.HTMLAttributes<HTMLLIElement>) {
  return <li {...props} />;
}
