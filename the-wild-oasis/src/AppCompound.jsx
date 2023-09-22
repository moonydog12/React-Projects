import Counter from './Counter'

function AppCompound() {
  return (
    <div>
      <h1>Compound Component Pattern</h1>

      <Counter>
        <Counter.Count />
        <Counter.Label>My super flexible counter</Counter.Label>
        <Counter.Increase icon="+" />
        <Counter.Decrease icon="-" />
      </Counter>
    </div>
  )
}

export default AppCompound
