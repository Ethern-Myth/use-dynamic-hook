# `useDynamicHook`

**'useDynamicHook'** is not a standard React Hook provided by React itself; rather, it is a custom hook created by users to encapsulate dynamic behavior or logic in a reusable and flexible way. Here are some key differences between useDynamicHook and standard React hooks:

<br/>

[![NPM](https://nodei.co/npm/use-dynamic-hook.png)](https://nodei.co/npm/use-dynamic-hook/)

## Installation

```bash
npm install use-dynamic-hook --save
OR
yarn add use-dynamic-hook
OR
pnpm add use-dynamic-hook
```

## Purpose

**'useDynamicHook'** is a custom React hook designed to create dynamic hooks with customizable behavior within functional components. It encapsulates complex logic or behavior and provides a cleaner interface to components, allowing for more flexible and reusable code.

<br/>

* Implementation:

    Standard React hooks are implemented and maintained by the React team and are part of the React library.
    useDynamicHook is a custom hook created by users. It is implemented by users according to their specific needs and requirements and is not part of the React library.

<br/>

* Usage:

    Standard React hooks are used directly within functional components to manage state and perform side effects.
    useDynamicHook is used similarly to standard React hooks but allows for more dynamic behavior and customization. It can be used to encapsulate complex logic or behavior and provide a cleaner interface to components.

<br/>

* Flexibility:

    Standard React hooks have predefined behavior and are used for specific purposes such as managing state or performing side effects.
    useDynamicHook provides more flexibility and can be tailored to various use cases by allowing users to define custom behavior or logic within the hook.

## Parameters

**hookFunction**: A function that defines the dynamic behavior of the hook.

<br/>

It takes two parameters:

<br/>

* **getState**: A function that returns the current state or value of the hook.

* **setState**: A function that updates the state or value of the hook.

* **props (optional)**: Additional props that can be passed to customize the behavior of the hook.

* **deps (optional)**: An array of dependencies that, when changed, will trigger the recalculation of the hook's behavior. If not provided, the hook will only be recalculated once when it is initially rendered.

## Return Value

The return value of useDynamicHook depends on the behavior defined by the hookFunction. It can vary based on the use case and customization provided by the user.

## Usage

```typescript
import useDynamicHook from 'use-dynamic-hook';

function MyComponent() {
  // Define the hook behavior using hookFunction
  const myDynamicHook = useDynamicHook((getState, setState, props) => {
    // Define the dynamic behavior here
    // Use getState to access the current state or value
    // Use setState to update the state or value
    // Use props to customize the behavior if needed

    // Return the result of the dynamic behavior
    return result;
  }, [deps]);

  // Use myDynamicHook in your component as needed

  return (
    // JSX content
  );
}

```

## Find More Examples here

[Use Dynamic Hook Examples](http://www.github.com/Ethern-Myth/use-dynamic-hook/examples)

## Example

Suppose we want to create a dynamic counter hook that increments the counter on each click:

```typescript
import { useState } from 'react';
import useDynamicHook from 'use-dynamic-hook';

function useDynamicCounter(initialCount) {
  return useDynamicHook((getState, setState) => {
    const [count, setCount] = useState(initialCount);

    const increment = () => {
      setCount(count + 1);
    };

    return { count, increment };
  });
}

function CounterComponent() {
  const { count, increment } = useDynamicCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

```

## API

    useDynamicHook(hookFunction: Function, deps?: Array): any

## Creator

This package was created by [Ethern Myth](http://www.github.com/Ethern-Myth/use-dynamic-hook/tree/main/examples)

## License

This project is licensed under the MIT License - see the [LICENSE](http://www.opensource.org/licenses/mit-license). file for details.

<br/>

**Don't forget to like this repo. If you have any questions feel free to ask**
