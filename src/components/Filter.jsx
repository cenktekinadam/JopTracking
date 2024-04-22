import { useEffect, useState } from 'react'
import { statusOpt, typeOpt, sortOpt } from '../constants'
import Select from './Select'
import Submitbtn from './Submitbtn'
import api from '../utils/api'
import { useDispatch } from 'react-redux'
import { setError, setJobs, setLoading } from '../app/slices/jobSlice'
import Animate from './Animate'

const Filter = () => {

    const [text, Settext] = useState();
    const [debouncedText, setDebouncedText] = useState()
    const [sort, setSort] = useState();
    const [status, setStatus] = useState();
    const [type, setType] = useState();

    const dispatch = useDispatch();

    //Her tuş tıklanıldıgında filtreleme yapmak(Api isteği atmak) düşük donanımlı cihazlarrda kasmalara sebep olur .Bu Yüzden bu tür işlemlarde DEBOUNCE algoritması kullanılmaldır
    // Debounce kısaca bir zaman aşımıdır .olay gerçekleştiği anda bir geri sayım başlar ve api isteği atılır
    useEffect(() => {
        if (!text) return
        // Bir sayaç başlatıp sayaç bitince olayı gerçekleştir
        const timer = setTimeout(() => setDebouncedText(text), 2000);
        // Component did mount olayını izleyerek  usefectin tekrar çalışması durumnuda sayacı sıfırla
        return () => {
            clearTimeout(timer)
        }
    }, [text])

    // Filtreleme ce sırlama ile ilgili state değiştiğinde aoidan verileri al 
    useEffect(() => {
        const sortParam =
            sort === 'a-z' || sort === 'z-a'
                ? 'company' :
                sort === 'En Yeni' || sort === 'En Eski'
                    ? 'date' : undefined

        const orderParam =
            sort === 'a-z' || sort === 'En Eski'
                ? 'asc'
                : sort === 'z-a' || sort === 'En Yeni'
                    ? 'desc'
                    : undefined;
        const params = {
            q: text,
            _sort: sortParam,
            _order: orderParam,
            type: type || undefined,
            status: status || undefined
        }

        dispatch(setLoading())

        api.get(`jobs`, { params }).then((res) =>
            dispatch(setJobs(res.data)))
            .catch((err) => dispatch(setError(err.message)))
        console.log(sortParam);
    }, [debouncedText, sort, type, status])

    const handleReset = (e) => {
        e.preventDefault();
        setDebouncedText(),
            Settext(),
            setSort(),
            setType(),
            setStatus()
        e.target.reset();
    }
    return (
        <div className='filtred'>
            <Animate />
            <div className='filter-sec'>
                <h2>Filtreleme Formu</h2>

                <form onSubmit={handleReset}>
                    <div>
                        <label htmlFor="">Şirket ismine Göre Ara</label>
                        <input onChange={(e) => Settext(e.target.value)} type="text" />
                    </div>
                    <Select label={'Durum'} options={statusOpt} handleChange={(e) => setStatus(e.target.value)} />
                    <Select label={'Tür'} options={typeOpt} handleChange={(e) => setType(e.target.value)} />
                    <Select label={'Sırala'} options={sortOpt} handleChange={(e) => setSort(e.target.value)} />
                    <div>
                        <Submitbtn text={'Filtreleri Sıfırla'} />
                    </div>
                </form>
            </div>
            <Animate />
        </div>)
}

export default Filter