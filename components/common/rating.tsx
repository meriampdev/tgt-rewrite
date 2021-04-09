import IconButton from '@material-ui/core/IconButton';
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';

interface IProps {
  rate: number
  onRate?: (value: number) => void
  size?: string
  className?: string
  disabled?: boolean
  displayOnly?: boolean
}

type iconSizeType = "small" | "inherit" | "default" | "large"
type btnSizeType = "small" | "medium"
export default function Rating(props: IProps) {
  const { rate, onRate, size, className } = props

  return (
    <div>
      {
        [0,1,2,3,4].map((starIndex) => {
          let star = starIndex + 1
          if(props.displayOnly) {
            return (<span key={`rating-${starIndex}`}>
              {
                rate >= star ? 
                  <StarOutlinedIcon className={className} fontSize={size as iconSizeType} /> 
                : <StarOutlineOutlinedIcon className={className} fontSize={size as iconSizeType} />
              }
            </span>)
          }
          return (
            <IconButton 
              key={`rating-${starIndex}`} 
              disabled={props.disabled} 
              onClick={() => {
                if(onRate) {
                  onRate(star)
                }
              }} 
              size={size as btnSizeType}
            >
              {
                rate >= star ? 
                  <StarOutlinedIcon className={className} fontSize={size as iconSizeType} /> 
                : <StarOutlineOutlinedIcon className={className} fontSize={size as iconSizeType} />
              }
            </IconButton>
          )
        })
      }
    </div>
  )
}