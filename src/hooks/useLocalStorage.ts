
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

      // If initialValue is an array, and parsedItem is also an array, return parsedItem.
      // If parsedItem is not an array, it's a mismatch, so return initialValue.
      if (Array.isArray(initialValue)) {
        if (Array.isArray(parsedItem)) {
          return parsedItem as T;
        }
        console.warn(`LocalStorage item for key "${key}" is not an array as expected. Using initial array.`);
        return initialValue;
      }

      // If initialValue is a non-array object, and parsedItem is also a non-array object, merge them.
      // This ensures all keys from initialValue are present, with localStorage values taking precedence.
      if (
        typeof initialValue === 'object' && initialValue !== null && // initialValue is a non-array object
        typeof parsedItem === 'object' && parsedItem !== null && !Array.isArray(parsedItem) // parsedItem is a non-array object
      ) {
        return { ...initialValue, ...parsedItem };
      }
      
      // For primitives, or if parsedItem is null.
      // If parsedItem is null and initialValue is not, prefer initialValue to avoid assigning null to a non-nullable state.
      if (parsedItem === null && initialValue !== null) {
        console.warn(`LocalStorage item for key "${key}" was null. Using initial value because initial value is non-null.`);
        return initialValue;
      }

      // At this point, parsedItem could be a primitive, or null (if initialValue was also null).
      // Or types might just match (e.g. both primitives of same type).
      // If parsedItem is undefined (e.g. JSON.parse('undefined')), fallback to initialValue.
      if (parsedItem !== undefined) {
        // Basic type check for safety, though not exhaustive.
        // Allows parsedItem if its type matches initialValue's or if both are null.
        if (typeof parsedItem === typeof initialValue || (parsedItem === null && initialValue === null)) {
            return parsedItem as T;
        } else {
            // Types are different in an unhandled way (e.g. initial is string, parsed is number)
            console.warn(`Type mismatch for localStorage key "${key}". Expected type compatible with initial value. Using initial value.`);
            return initialValue;
        }
      }
      
      // Fallback for undefined parsedItem or other unhandled cases to ensure a T is returned.
      return initialValue;
    }
    return initialValue; // Item not found in localStorage
  } catch (error) {
    // This catch block handles JSON.parse errors or other unexpected issues during processing
    console.warn(`Warning: Error reading or parsing localStorage key “${key}”:`, error);
    return initialValue; // Fallback to initialValue on error
  }
}

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => getResolvedState(key, initialValue));

  useEffect(() => {
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
