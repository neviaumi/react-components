export function generateTestIdWithPrefix({
  id,
  prefix,
}: {
  id: string;
  prefix?: string;
}) {
  if (!prefix) return id;
  return [prefix, id].join('-');
}
