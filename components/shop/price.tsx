interface IProps {
  sellingPrice: string 
  largeDisplay?: boolean
}

const numberWithCommas = (x: string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export default function PriceTag(props: IProps) {
  const { sellingPrice, largeDisplay } = props
  const cost = parseFloat(sellingPrice).toFixed(2)
  let extract = cost.split('.')
  const whole = numberWithCommas(extract[0])
  const decimal = extract[1]
  if(largeDisplay) {
    return (
      <div className="flex items-start">
        <span className="text-base">₱</span>
        <span className="font-bold text-3xl">{whole}</span>
        <span className="text-md decimal">{decimal}</span>
      </div>
    )
  }
  return (
    <div className="flex items-start">
      <span className={ largeDisplay ? "text-base" : "text-sm"}>₱</span>
      <span className={`font-bold text-${largeDisplay ? '3xl' : 'lg'}`}>{whole}</span>
      <span className={`text-${largeDisplay ? 'md' : 'sm'} decimal`}>{decimal}</span>
    </div>
  )
}