import { useState } from "react";

type StoredValueType<T> = T;
type SetValueType<T> = T | ((val: T) => T);
type SetValueFnType<T> = (value: SetValueType<T>) => void;

type UseLocalStorageReturnType<T> = [StoredValueType<T>, SetValueFnType<T>];

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturnType<T> {
  const [storedValue, setStoredValue] = useState<StoredValueType<T>>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue: SetValueFnType<T> = (value: SetValueType<T>) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
