import { useState } from 'react';

export function useId(prefix = 'id') {
  const [id] = useState(
    prefix + '-' + Math.random().toString(36).substring(5)
  );
  return id;
}
