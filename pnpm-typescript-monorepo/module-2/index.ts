import { module1 } from 'module-1'
console.log('module-2 is running!')
console.log('module-2 imported %o', { module1 })
export const module2 = 'module2'
