# Couple of examples demonstrating how you can use the 'useDynamicHook' hook

## Example 1: Dynamic Counter Hook

Suppose you want to create a dynamic counter hook that can be used with different initial values. Here's how you can do it using useDynamicHook:

<br/>

```typescript
import { useState } from "react";
import useDynamicHook from "use-dynamic-hoook";

function useDynamicCounter(initialCount) {
  return useDynamicHook(
    (getState, setState) => {
      const count = getState() ?? initialCount;

      const increment = () => setState(count + 1);
      const decrement = () => setState(count - 1);

      return {
        count,
        increment,
        decrement,
      };
    },
    [initialCount]
  );
}

// Usage in a component
function CounterComponent({ initialCount }) {
  const { count, increment, decrement } = useDynamicCounter(initialCount);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

```

## Example 2: Dynamic Timer Hook

Now, let's create a dynamic timer hook that can be started with different initial durations:

<br/>

```typescript
import { useEffect, useState } from "react";
import useDynamicHook from "use-dynamic-hook";

function useDynamicTimer(initialDuration) {
  return useDynamicHook(
    (getState, setState) => {
      const duration = getState() ?? initialDuration;
      const [time, setTime] = useState(duration);

      useEffect(() => {
        const timer = setInterval(() => {
          setTime((prevTime) => {
            if (prevTime === 0) {
              clearInterval(timer);
              return duration;
            } else {
              return prevTime - 1;
            }
          });
        }, 1000);

        return () => clearInterval(timer);
      }, [duration]);

      return {
        time,
        reset: () => setTime(duration),
      };
    },
    [initialDuration]
  );
}

// Usage in a component
function TimerComponent({ initialDuration }) {
  const { time, reset } = useDynamicTimer(initialDuration);

  return (
    <div>
      <p>Time: {time}</p>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

```

## Example 3: Dynamic Form State Hook

Suppose you want to create a dynamic form state hook that can handle different form fields and their initial values:

<br/>

```typescript
import { useState } from "react";
import useDynamicHook from "use-dynamic-hook";

function useDynamicForm(initialFormState) {
  return useDynamicHook(
    (getState, setState) => {
      const formState = getState() ?? initialFormState;

      const handleChange = (fieldName, value) => {
        setState({
          ...formState,
          [fieldName]: value,
        });
      };

      const resetForm = () => setState(initialFormState);

      return {
        formState,
        handleChange,
        resetForm,
      };
    },
    [initialFormState]
  );
}

// Usage in a component
function FormComponent({ initialFormState }) {
  const { formState, handleChange, resetForm } = useDynamicForm(
    initialFormState
  );

  return (
    <form>
      <input
        type="text"
        value={formState.username}
        onChange={(e) => handleChange("username", e.target.value)}
      />
      <input
        type="password"
        value={formState.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />
      <button type="button" onClick={resetForm}>
        Reset
      </button>
    </form>
  );
}


```

## Example 4: Dynamic Theme Hook

Suppose you want to create a dynamic theme hook that can toggle between light and dark themes:

<br/>

```typescript
import { useState } from "react";
import useDynamicHook from "use-dynamic-hook";

function useDynamicTheme(initialTheme = "light") {
  return useDynamicHook(
    (getState, setState) => {
      const theme = getState() ?? initialTheme;

      const toggleTheme = () => {
        setState(theme === "light" ? "dark" : "light");
      };

      return {
        theme,
        toggleTheme,
      };
    },
    [initialTheme]
  );
}

// Usage in a component
function ThemeComponent({ initialTheme }) {
  const { theme, toggleTheme } = useDynamicTheme(initialTheme);

  return (
    <div className={`App ${theme}`}>
      <h1>Dynamic Theme Example</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

```

## Example 5: Dynamic Local Storage Hook

Suppose you want to create a dynamic hook to manage state in local storage with different keys:

<br/>

```typescript
import { useState, useEffect } from "react";
import useDynamicHook from "use-dynamic-hook";

function useDynamicLocalStorage(key, initialValue) {
  return useDynamicHook(
    (getState, setState) => {
      const storedValue = JSON.parse(localStorage.getItem(key));
      const value = getState() ?? (storedValue !== null ? storedValue : initialValue);

      useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
      }, [key, value]);

      return [value, setState];
    },
    [key, initialValue]
  );
}

// Usage in a component
function LocalStorageComponent({ storageKey, initialValue }) {
  const [value, setValue] = useDynamicLocalStorage(storageKey, initialValue);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

```

## Example 6: Dynamic Fetch Hook

Suppose you want to create a dynamic hook to fetch data from different endpoints:

<br/>

```typescript

import { useState, useEffect } from "react";
import useDynamicHook from "use-dynamic-hook";

function useDynamicFetch(url) {
  return useDynamicHook(
    (getState, setState) => {
      const [data, setData] = useState(null);
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      useEffect(() => {
        fetchData();
      }, [url]);

      return data;
    },
    [url]
  );
}

// Usage in a component
function FetchComponent({ url }) {
  const data = useDynamicFetch(url);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}

```

## Example 7: Dynamic Event Listener Hook

Suppose you want to create a dynamic hook to handle different event listeners:

<br/>

```typescript
import { useEffect } from "react";
import useDynamicHook from "use-dynamic-hook";

function useDynamicEventListener(eventType, handler) {
  return useDynamicHook(
    (getState, setState) => {
      useEffect(() => {
        const eventListener = (event) => {
          handler(event);
        };

        window.addEventListener(eventType, eventListener);

        return () => {
          window.removeEventListener(eventType, eventListener);
        };
      }, [eventType, handler]);
    },
    [eventType, handler]
  );
}

// Usage in a component
function EventListenerComponent({ eventType, handler }) {
  useDynamicEventListener(eventType, handler);

  return <div>Listening for {eventType} events...</div>;
}

```

## Example 8: Dynamic Media Query Hook

Suppose you want to create a dynamic hook to handle different media queries:

<br/>

```typescript
import { useState, useEffect } from "react";
import useDynamicHook from "use-dynamic-hook";

function useDynamicMediaQuery(query) {
  return useDynamicHook(
    (getState, setState) => {
      const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

      useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        const handleMediaQueryChange = (event) => {
          setMatches(event.matches);
        };

        mediaQuery.addEventListener("change", handleMediaQueryChange);

        return () => {
          mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
      }, [query]);

      return matches;
    },
    [query]
  );
}

// Usage in a component
function MediaQueryComponent({ query }) {
  const matches = useDynamicMediaQuery(query);

  return <div>{matches ? "Matched!" : "Not matched."}</div>;
}

```

### Example 9: Dynamic Pagination Hook

Suppose you want to create a dynamic pagination hook that can handle different pagination configurations:

<br/>

```typescript
import { useState, useEffect } from "react";
import useDynamicHook from "use-dynamic-hook";

function useDynamicPagination(totalItems, itemsPerPage) {
  return useDynamicHook(
    (getState, setState) => {
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const [currentPage, setCurrentPage] = useState(1);

      useEffect(() => {
        setState(currentPage);
      }, [currentPage]);

      const goToPage = (pageNumber) => {
        setCurrentPage(Math.max(1, Math.min(totalPages, pageNumber)));
      };

      const nextPage = () => {
        goToPage(currentPage + 1);
      };

      const prevPage = () => {
        goToPage(currentPage - 1);
      };

      return {
        currentPage,
        totalPages,
        goToPage,
        nextPage,
        prevPage,
      };
    },
    [totalItems, itemsPerPage]
  );
}

// Usage in a component
function PaginationComponent({ totalItems, itemsPerPage }) {
  const { currentPage, totalPages, goToPage, nextPage, prevPage } =
    useDynamicPagination(totalItems, itemsPerPage);

  return (
    <div>
      <button onClick={prevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span> Page {currentPage} of {totalPages} </span>
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Next
      </button>
      <select value={currentPage} onChange={(e) => goToPage(parseInt(e.target.value))}>
        {Array.from({ length: totalPages }, (_, i) => (
          <option key={i + 1} value={i + 1}>{i + 1}</option>
        ))}
      </select>
    </div>
  );
}

```

## Example 10: Dynamic Form Validation Hook

Suppose you want to create a dynamic form validation hook that can handle different validation rules:

<br/>

```typescript
import { useState, useEffect } from "react";
import useDynamicHook from "use-dynamic-hook";

function useDynamicFormValidation(validationRules) {
  return useDynamicHook(
    (getState, setState, props) => {
      const [formData, setFormData] = useState(props.initialFormData);
      const [errors, setErrors] = useState({});

      useEffect(() => {
        setErrors(validateForm(formData));
      }, [formData]);

      const handleChange = (fieldName, value) => {
        setFormData({
          ...formData,
          [fieldName]: value,
        });
      };

      const validateForm = (data) => {
        let validationErrors = {};
        for (let fieldName in validationRules) {
          const rule = validationRules[fieldName];
          if (rule.required && !data[fieldName]) {
            validationErrors[fieldName] = `${fieldName} is required`;
          } else if (rule.minLength && data[fieldName].length < rule.minLength) {
            validationErrors[fieldName] = `${fieldName} should be at least ${rule.minLength} characters`;
          }
          // Add more validation rules as needed
        }
        return validationErrors;
      };

      return {
        formData,
        errors,
        handleChange,
        isValid: Object.keys(errors).length === 0,
      };
    },
    [validationRules]
  );
}

// Usage in a component
function FormValidationComponent({ validationRules }) {
  const { formData, errors, handleChange, isValid } =
    useDynamicFormValidation(validationRules);

  return (
    <form>
      <input
        type="text"
        value={formData.username}
        onChange={(e) => handleChange("username", e.target.value)}
      />
      {errors.username && <div className="error">{errors.username}</div>}
      {/* Repeat for other form fields */}
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}

```

## Example 11: Dynamic WebSocket Chat Hook

Suppose you want to create a dynamic hook to handle WebSocket chat connections with different rooms:

<br/>

```typescript
import { useState, useEffect } from "react";
import useDynamicHook from "use-dynamic-hook";

function useDynamicChat(roomId) {
  return useDynamicHook(
    (getState, setState) => {
      const [messages, setMessages] = useState([]);

      useEffect(() => {
        // Connect to WebSocket chat room using roomId
        const socket = new WebSocket(`wss://example.com/chat/${roomId}`);

        socket.onmessage = (event) => {
          const newMessage = JSON.parse(event.data);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        return () => {
          socket.close();
        };
      }, [roomId]);

      const sendMessage = (message) => {
        // Send message to WebSocket chat room
        // Example: socket.send(JSON.stringify({ roomId, message }));
      };

      return {
        messages,
        sendMessage,
      };
    },
    [roomId]
  );
}

// Usage in a component
function ChatComponent({ roomId }) {
  const { messages, sendMessage } = useDynamicChat(roomId);

  // Use messages and sendMessage functions

  return <div>Chat Component</div>;
}
```

## Extras

```typescript
import { useEffect, useState } from "react";
import useDynamicHook from "use-dynamic-hook";

function useDynamicKeyboardEventHandler() {
  return useDynamicHook(
    (getState, setState) => {
      const [keyPressed, setKeyPressed] = useState(null);

      useEffect(() => {
        const handleKeyDown = (event) => {
          setKeyPressed(event.key);
        };

        const handleKeyUp = () => {
          setKeyPressed(null);
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
          document.removeEventListener("keydown", handleKeyDown);
          document.removeEventListener("keyup", handleKeyUp);
        };
      }, []);

      return keyPressed;
    },
    []
  );
}

// Usage in a component
function KeyboardEventHandlerComponent() {
  const keyPressed = useDynamicKeyboardEventHandler();

  return (
    <div>
      <p>Pressed key: {keyPressed}</p>
      <p>Press any key to see the result</p>
    </div>
  );
}


```
