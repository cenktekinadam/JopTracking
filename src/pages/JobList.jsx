import { useSelector } from "react-redux"
import Loader from "../components/Loader"
import Error from "../components/Error"
import Card from "../components/Card"
import Filter from "../components/Filter"

const JobList = ({ retry }) => {
    const { jobs, error, isloading } = useSelector((store) => store)

    return (
        <div className="list-page">
            {!error && <Filter />}
            {isloading ? (<Loader />) : error ? (<Error msj={error.message} retry={retry} />) :
                (<div className="cards-wrapper">
                    {jobs.map((i) => <div key={i.id}><Card key={i.id} job={i} /></div>)}
                </div>)}
        </div>
    )
}

export default JobList