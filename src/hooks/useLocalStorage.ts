
"use client";

import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

// Helper function to read and process value from localStorage
function getResolvedState<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") {
    return initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    if (item) {
      const parsedItem = JSON.parse(item);
      // If initialValue is an object, and parsedItem is also an object,
      // merge them to ensure all keys from initialValue are present.
      // Values from parsedItem (localStorage) take precedence.
      if (typeof initialValue === 'object' && initialValue !== null &&
          typeof parsedItem === 'object' && parsedItem !== null) {
        return { ...initialValue, ...parsedItem };
      }
      // Return parsedItem if not objects or if one of them is null (e.g. localStorage stores 'null')
      // or if initialValue is not an object.
      return parsedItem; 
    }
    return initialValue; // Item not found in localStorage
  } catch (error) {
    console.warn(`Warning: Error reading localStorage key “${key}”:`, error);
    return initialValue; // Fallback to initialValue on error
  }
}

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => getResolvedState(key, initialValue));

  useEffect(() => {
    // This effect synchronizes state with localStorage on client-side mount
    // and if the key or initialValue (if it's a dependency that changes) changes.
    // It's important for ensuring client-side localStorage is the source of truth after hydration.
    setStoredValue(getResolvedState(key, initialValue));
    
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(getResolvedState(key, initialValue));
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener('storage', handleStorageChange);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener('storage', handleStorageChange);
      }
    };
  // initialValue is included as a dependency. If it's an object literal passed directly to the hook,
  // it will cause this effect to re-run on every render of the consuming component.
  // For optimal performance, object/array initialValues should be memoized by the caller.
  // However, for this application's scale, the impact is likely negligible.
  }, [key, initialValue]);

  const setValue: SetValue<T> = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Warning: Error setting localStorage key “${key}”:`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
