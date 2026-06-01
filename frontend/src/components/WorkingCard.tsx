
type WorkingCardProps = {
  title: string;
  value:number;
  suffix?:string
};


const WorkingCard = ({title,value,suffix}:WorkingCardProps) => {
  
  
  return (
    <div className='bg-white border border-gray-200 rounded-xl p-4 '>
      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
        {title}
      </p>
      <p className="text-2xl font-semibold mt-3 text-black">
        {value}
        {suffix}
      </p>
      
    </div>
  )
}

export default WorkingCard
