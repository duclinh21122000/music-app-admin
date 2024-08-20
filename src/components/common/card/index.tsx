import {
  Card as NextCard,
  CardBody,
  CardFooter,
  CardHeader,
} from '@nextui-org/react'
import React from 'react'

type CardProps = {
  cardHeader?: React.ReactNode
  cardFooter?: React.ReactNode
  children: React.ReactNode
  classNameContainer?: React.ComponentProps<'div'>['className']
}

const Card = ({
  cardHeader,
  cardFooter,
  children,
  classNameContainer,
}: CardProps) => {
  return (
    <NextCard className={`w-full shadow-card ${classNameContainer}`}>
      {cardHeader && <CardHeader>{cardHeader}</CardHeader>}
      <CardBody>{children}</CardBody>
      {cardFooter && <CardFooter>{cardFooter}</CardFooter>}
    </NextCard>
  )
}

export default Card
