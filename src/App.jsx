import { BrowserRouter, Route, Routes } from "react-router-dom"
import AddList from "./pages/AddList"
import JobList from "./pages/JobList"
import Header from "./components/Header"
import { useEffect } from "react"
import api from "./utils/api"
import { useDispatch } from "react-redux"
import { setError, setJobs, setLoading } from "./app/slices/jobSlice"

const App = () => {
  const dispatch = useDispatch()

  const getJobs = () => {
    dispatch(setLoading());

    api.get('/jobs').then((res) => dispatch(setJobs(res.data))).catch((err) => dispatch(setError(err)))
  }
  useEffect(() => {
    getJobs();
  }, [])
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<JobList retry={getJobs} />} />
        <Route path="/new" element={<AddList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App