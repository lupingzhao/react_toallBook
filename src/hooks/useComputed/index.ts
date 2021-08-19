import { useMemo } from 'react'
// 相当于计算属性
type Callback = () => any

export const useComputed = (callback: Callback, data: any) => {
  return useMemo(callback, [data])
}