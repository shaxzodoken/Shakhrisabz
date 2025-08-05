import { component$, useSignal } from '@builder.io/qwik'
import { Input } from 'flowbite-qwik'

export default component$(() => {
  const val = useSignal('')
  return (
    <>
      <div class="p-3">
        <p class="text-xl">Value : {val.value}</p>
        <Input bind:value={val} label="Name" placeholder="John Doe" />
      </div>
    </>
  )
})