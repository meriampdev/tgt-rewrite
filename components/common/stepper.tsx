import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

interface IProps {
  children: any
  type: 'breadcrumb' | 'panels' | 'circles' | 'bullets'
  steps: string[]
  userAtStep: number
  startAt?: number
  onNavigateStep: (step: string) => void
  lastStepHandler?: any
  disableSteps?: boolean
  disabledStepStart?: number
  disableNextStep?: boolean
}
export default function Stepper(props: IProps) {
  const { children, type, startAt, steps, userAtStep, onNavigateStep, lastStepHandler } = props 
  const [ active, setActive ] = useState(startAt ?? 0)
  const [ disableSteps, setDisableSteps ] = useState(false)

  useEffect(() => {
    setDisableSteps(props.disableSteps)
  }, [props.disableSteps])

  const onStep = (index: number, step: string) => {
    setActive(index)
    onNavigateStep(step)
  }

  const onPrevious = () => {
    let prev = active - 1
    setActive(prev)
    onNavigateStep(steps[prev])
  }

  const onNext = () => {
    let next = active + 1
    setActive(next)
    onNavigateStep(steps[next])
  }

  const stepperType = () => {
    switch(type) {
      case 'breadcrumb':
        return (
          <div className="flex flex-row gap-5">
            {
              steps.map((step, i) => {
                let stepClass = i <= userAtStep ? 'text-blue-500' : ''
                let shouldDisable = props.disableNextStep && i === active+1 
                let disabled = shouldDisable ?? (disableSteps && i >= props.disabledStepStart)
                if(active === i) {
                  stepClass = 'text-green-500'
                }
                
                return (
                  <div 
                    key={`step-${i}`}
                    onClick={() => onStep(i, step)} 
                    className={`${stepClass} ${disabled ? 'disabled' : ''} flex flex-row gap-2 hover:text-green-500 items-center cursor-pointer`}>
                    <span className="text-sm">{step}</span>
                    { (i !== (steps.length - 1)) && <ChevronRightIcon /> }
                  </div>
                )
              })
            }
          </div>
        )
      default: return null 
    }
  }

  return (
    <div className="stepper-wrapper flex flex-col">
      <div className="stepper mb-6">
      {stepperType()}
      </div>
      <div className="content">
        {React.Children.map(children, (child, i) => {
          if(i === active) {
            return <div>{child}</div>
          } else {
            return <div style={{display: 'none'}}>{child}</div>
          }
        })}
      </div>
      <div className="flex flex-row gap-5 justify-between mt-5">
        <Button color="primary" onClick={onPrevious} startIcon={<ChevronLeftIcon />}>
          <span>Return to {steps[active-1]}</span>
        </Button>
        { active !== steps.length-1 &&
          <Button color="primary" endIcon={<ChevronRightIcon />} onClick={onNext}>
            <span>Proceed to {steps[active+1]}</span>
          </Button>
        }
        { active === steps.length -1 && <>{lastStepHandler}</> }
      </div>
    </div>
  )
}