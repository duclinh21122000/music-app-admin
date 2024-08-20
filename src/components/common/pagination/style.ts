import { tv } from 'tailwind-variants'

const baseItem = tv({
  base: [
    'flex size-[32px] cursor-pointer items-center justify-center rounded-lg border border-border-200 px-1 font-medium leading-[normal] text-primary',
  ],
  variants: {
    disabled: {
      true: '!cursor-not-allowed',
    },
  },
})

const item = tv({
  extend: baseItem,
  variants: {
    active: {
      true: 'bg-primary font-bold text-white',
    },
  },
  compoundVariants: [
    {
      active: false,
      disabled: true,
      className: '!cursor-not-allowed',
    },
    {
      active: false,
      disabled: false,
      className: 'hover:border-primary hover:text-primary',
    },
  ],
})

const icon = tv({
  extend: baseItem,
  base: 'mx-1',
  variants: {
    active: {
      true: '',
      false: '!cursor-not-allowed',
    },
    next: {
      true: 'cursor-pointer',
    },
  },
  compoundVariants: [
    {
      active: true,
      disabled: true,
      class: '!cursor-not-allowed',
    },
    {
      active: true,
      disabled: false,
      class: 'hover:border-primary hover:text-primary',
    },
  ],
})

const dot = tv({
  extend: baseItem,
  base: 'group border-none',
  variants: {
    disabled: {
      true: 'cursor-not-allowed',
      false: 'cursor-pointer',
    },
  },
})

export const paginationStyles = { item, dot, icon }
