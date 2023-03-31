import { createContext, PropsWithChildren, useContext, useId } from 'react';

const FieldContext = createContext<{ id?: string }>({});

export function Field(props: PropsWithChildren) {
  const id = useId();
  return (
    <FieldContext.Provider value={{ id: id }}>
      {props.children}
    </FieldContext.Provider>
  );
}

export function useFieldContext() {
  return useContext(FieldContext);
}
