## Practical guidelines about state

- Use a state variable for data **that will change at some point**
- Want something in the component to be **dynamic**
  Example: A modal window can be open or closed
- Want to change the way a component looks, or the data it displays, **update its state**.
- For data that should not trigger component re-renders.**don't use state**.

## Think in React

### Process

1. Break the UI into components
2. Build the static version
3. Think about state
   - When to use state
   - Types of state: local v.s global
4. Establish data flow
   - One-way data flow
   - Child to parent communication
   - Accessing global state

> global state: State that many components might need
>
> local state: State needed only by one or few components

## Components

### General Guidelines

- More abstractions(new component) require more mental energy(cost)
- Name a component according to **what it does** or **what it displays**
- Never declare a new component inside anther component
- Co-locate related components inside the same file
