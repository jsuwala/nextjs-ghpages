import Stream1 from './stream1'
import Stream2 from './stream2'

const redirectStream = () => {
  const scenario = process.env.NEXT_PUBLIC_STREAM
  if (scenario === 'stream1') {
    console.log('Redirecting to stream1')
    return <Stream1 />
  } else if (scenario === 'stream2') {
    console.log('Redirecting to stream2')
    return <Stream2 />
  } else {
    return <div>Scenario not found</div>
  }
}


export default function Home() {
  return (
    <div className='layout'>
      {redirectStream()}
    </div>
  )
}