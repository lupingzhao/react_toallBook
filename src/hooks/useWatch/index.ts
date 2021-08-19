import { useEffect } from 'react'
// 相当于监听
type Callback = () => void

export const useWatch = (callback: Callback, data: any) => {
  useEffect(callback, [data])
}