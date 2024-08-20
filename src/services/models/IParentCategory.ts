import type { IAssets } from './IAssets'

export interface IParentCategory {
  id: number
  name: string
  slug: string
  description: string
  image: IAssets
}
