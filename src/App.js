import React from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'

function App() {
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [isError, setIsError ] = React.useState(false);
  const [ data, setData ] = React.useState([]);
  const [ actualJob, setActualJob ] = React.useState([])

  const fetchData = async() => {
     setIsLoading(true);
     try {
      const response = await fetch(url);
      if(response.ok){
        const data = await response.json();
        setData(data)
        setActualJob(data[0])
        setIsError(false);
        setIsLoading(false);
        return
      }
      setIsError(true);
      setIsLoading(false)  
     } catch (error) {
       console.log(error)
     }
  }

  const handleOnClick = (company) => {
    const job = data.filter((item) => item.company === company)
    setActualJob(...job)
  }

  React.useEffect(()=> {
    fetchData()
  },[])

  if(isLoading){
    return <div className='section'>
      <h3 className='loading'>Loading ...</h3>
    </div>
  }
 
  if(isError){
    return <h3>Sorry, an Error occured...</h3>
  }

  const {company, dates, duties, title} = actualJob;
  return (
  <main className='section'>
    <header className='title'>
      <h3> Experience</h3>
      <div className='underline'/>
    </header>
    <div className='job-center'>
      <section className='btn-container'>
        {data.map((elt) => {
          const company = elt.company;
          return <button className={`job-btn ${company === actualJob.company && 'active-btn'}`} key={elt.id} onClick={() => handleOnClick(company)}>{company}</button>
        })}
      </section>
      <section className='job-info'>
        <h3>{title}</h3>
        <h4>{company}</h4><br/>
        <p className='job-date'>{dates}</p>
          {duties?.map((duty, index) => {
            return <article key={index} className="job-desc">
            < FaAngleDoubleRight className='job-icon'/><p>{ duty}</p> 
            </article>
          })}
        <button className='btn'>more info</button>
      </section>
    </div>
  </main>)
}

export default App
