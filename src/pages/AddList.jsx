
import AutoInput from '../components/AutoInput'
import { statusOpt, typeOpt } from '../constants'
import { v4 } from 'uuid'
import api from '../utils/api'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { createJobs } from '../app/slices/jobSlice'
import { useNavigate } from 'react-router-dom'
import Select from '../components/Select'
import Submitbtn from '../components/Submitbtn'
import Animate from '../components/Animate'
const AddList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        // İnput verilerinden nesne oluştur
        const formData = new FormData(e.target)
        const newJobData = Object.fromEntries(formData.entries())
        console.log(newJobData)

        //Tarih ve id Ekle
        newJobData.id = v4();
        newJobData.date = Date.now()

        //api kaydet
        api.post("/jobs", newJobData)
            .then(() => {
                //Bildirim gönder
                toast.success("İş Başarıyla Kaydedildi")
                //Stores kaydet
                dispatch(createJobs(newJobData))
                // Anasayfaya yönlendir        
                navigate('/')

            })
            .catch((err) => {
                toast.error("İş eklenirken Bir hata oluştu")
            })





        //Hata Durumunda Bildirim
    }
    return (
        <div className='add-page'>
            <Animate />

            <section className="container">
                <h2> Yeni İş Ekle</h2>

                <form onSubmit={handleSubmit}>
                    <AutoInput label={'Pozisyon'} name={'position'} />
                    <AutoInput label={'Şirket'} name={'company'} />
                    <AutoInput label={'Lokasyon'} name={'location'} />
                    <Select label={'Tür'} name={"type"} options={typeOpt} />
                    <Select label={'Durum'} name={'status'} options={statusOpt} />


                    <div>
                        <Submitbtn text={'İşi Kaydet'} />
                    </div>
                </form>
            </section>
            <Animate />
        </div>
    )
}

export default AddList