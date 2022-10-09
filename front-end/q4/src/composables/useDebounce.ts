const useDebounceFn = (fn: Function, delay: number) => {
  let timeout: number

  return (...args: any[]) => {
    if (timeout) {
      window.clearTimeout(timeout)
    }

    timeout = window.setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export {
  useDebounceFn
}