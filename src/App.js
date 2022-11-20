import s from './App.module.scss';
import Modal from './components/Modal/Modal.js';
import DropDown from './components/Dropdown/DropDown.js';
import React, {useState} from 'react';
import axios from 'axios';
import {days} from './libs/enums.js';
import {BASE_URL} from './config.js'


function App() {

    const [reportName, setReportName] = useState("");
    const [selectedFormatOption, setFormatOption] = useState("CSV");
    const [email, setEmail] = useState("");
    const [is_active, setActiveModal] = useState(false);
    const [selectedScheduleOption, setScheduleOption] = useState("No Repeat");
    const [date, setDate] = useState("");
    const [timeSpecDate, setTimeSpecDate] = useState("");
    const [timeDaily, setTimeDaily] = useState("");
    const [timeWeekly, setTimeWeekly] = useState("");

    const [isSuccess, setRespStatus] = useState(false);
    const [response, setResponse] = useState("");


    const setDefaultDay = () => {
        return days[0].value
    }
    const [selectedDayOption, setDayOption] = useState(setDefaultDay())
    const [flag, setFlag] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [reportNameError, setReportNameError] = useState("");
    const [formatError, setFormatError] = useState("");
    const [scheduleError, setScheduleError] = useState("");
    const [dateError, setDateError] = useState("");
    const [timeSpecDateError, setTimeSpecDateError] = useState("");
    const [timeDailyError, setTimeDailyError] = useState("");
    const [timeWeeklyError, setTimeWeeklyError] = useState("");
    const [dayError, setDayError] = useState("");


    const clearData = () => {
        setReportName("")
        setFormatOption("CSV")
        setEmail("")
        setScheduleOption("No Repeat")
        setDate("")
        setTimeSpecDate("")
        setTimeDaily("")
        setDayOption(setDefaultDay())
        setTimeWeekly("")
        setResponse("")
        setRespStatus(false)
    }

    const sendModalForm = async() => {

        const payload = {
                "report_name": reportName,
                "format": selectedFormatOption,
                "email": email,
                "schedule": selectedScheduleOption,
            }

        switch(selectedScheduleOption) {
            case 'No Repeat':
                break
            case 'Specific Date':
                payload.date = date
                payload.time = timeSpecDate
                break
            case 'Daily':
                payload.time = timeDaily
                break
            case 'Weekly':
                payload.day = selectedDayOption
                payload.time = timeWeekly
                break
            default:
                break
        }

        try{
            const {data} = await axios.post(`${BASE_URL}modal_data/create/`, payload)
            console.log(data)
            setRespStatus(true)
            setResponse('Request succeeded!')
        }
        catch(error){
            console.log(error.response.data)
            setEmailError(error.response.data.email)
            setReportNameError(error.response.data.report_name)
            setFormatError(error.response.data.format)
            setScheduleError(error.response.data.schedule)

            switch(selectedScheduleOption) {
                case 'No Repeat':
                    break
                case 'Specific Date':
                    setDateError(error.response.data.date)
                    setTimeSpecDateError(error.response.data.time)
                    break
                case 'Daily':
                    setTimeDailyError(error.response.data.time)
                    break
                case 'Weekly':
                    setDayError(error.response.data.day)
                    setTimeWeeklyError(error.response.data.time)
                    break
                default:
                    break
            }
        }
    }

    return (
        <div className={s.app}>
            <div className={s.openModal}>
                <button className={s.button} onClick={()=> {setActiveModal(!is_active)}}>{is_active ? 'Close' : 'Open'} modal window</button>
            </div>
            {is_active ?
            <Modal setActiveModal={setActiveModal} >
                <h3 className={s.modalHeader}>Export Report</h3>
                <div className={s.modalForm}>
                    <div className={s.modalReportName}>
                        <label className={s.label} for="report_name">Report name</label>
                        <div className={s.fieldContainer}>
                            <div className={s.field}>
                                <input className={s.input} id='report_name' type="name" placeholder="Shareablee report" value={reportName} onChange={(e)=> setReportName(e.target.value)} onClick={()=>{setReportNameError("")}}></input>
                                <div className={s.error}>{reportNameError}</div>
                            </div>
                        </div>
                    </div>
                    <div className={s.modalReportName}>
                        <label className={s.label} for="format">Format</label>
                        <div className={s.fieldContainer}>
                            <div className={s.field}>
                                <div className={s.radioContainerFormat}>
                                    <div className={s.radioOption}>
                                        <input id='format' type="radio" value="CSV" checked={selectedFormatOption === "CSV"} onChange={e => setFormatOption(e.target.value)} onClick={()=>{setFormatError("")}}/>
                                        <label>CSV</label>
                                    </div>
                                    <div className={s.radioOption}>
                                        <input id='format' type="radio" value="XML" checked={selectedFormatOption === "XML"} onChange={e => setFormatOption(e.target.value)} onClick={()=>{setFormatError("")}}/>
                                        <label>XML</label>
                                    </div>
                                </div>
                                <div className={s.error}>{formatError}</div>
                            </div>
                        </div>
                    </div>
                    <div className={s.modalReportName}>
                        <label className={s.label} for="report_name">E-mail to</label>
                        <div className={s.fieldContainer}>
                            <div className={s.field}>
                                <input className={s.input} id='report_name' type="text" placeholder="client@company.com" value={email} onChange={(e)=> setEmail(e.target.value)} onClick={()=>{setEmailError("")}}></input>
                                <div className={s.error}>{emailError}</div>
                            </div>
                        </div>
                    </div>
                    <div className={s.modalReportName}>
                        <label className={s.label} >Schedule</label>
                        <div className={s.fieldContainer}>
                            <div className={s.field}>
                                <div className={s.radioContainer}>
                                    <div className={s.radioOption}>
                                        <input id='format' type="radio" value="No Repeat" checked={selectedScheduleOption === "No Repeat"} onChange={e => setScheduleOption(e.target.value)} onClick={()=>{setScheduleError("")}}/>
                                        <label>No Repeat</label>
                                    </div>
                                    <div className={s.radioOption}>
                                        <input id='format' type="radio" value="Specific Date" checked={selectedScheduleOption === "Specific Date"} onChange={e => setScheduleOption(e.target.value)} onClick={()=>{setScheduleError("")}}/>
                                        <label>Specific Date</label>
                                    </div>
                                    <div className={s.radioOption}>
                                        <input id='format' type="radio" value="Daily" checked={selectedScheduleOption === "Daily"} onChange={e => setScheduleOption(e.target.value)} onClick={()=>{setScheduleError("")}}/>
                                        <label>Daily</label>
                                    </div>
                                    <div className={s.radioOption}>
                                        <input id='format' type="radio" value="Weekly" checked={selectedScheduleOption === "Weekly"} onChange={e => setScheduleOption(e.target.value)} onClick={()=>{setScheduleError("")}}/>
                                        <label>Weekly</label>
                                    </div>
                                </div>
                                <div className={s.error}>{scheduleError}</div>
                            </div>
                        </div>
                    </div>

                    {
                        {
                            "No Repeat": null,
                            "Specific Date":
                                <div className={s.modalReportName}>
                                    <label className={s.label}>Date</label>
                                    <div className={s.fieldContainer}>
                                        <div className={s.field}>
                                            <input className={s.dateInput} type="date" value={date} onChange={(e)=> setDate(e.target.value)} onClick={()=>{setDateError("")}}></input>
                                            <div className={s.error}>{dateError}</div>
                                        </div>
                                        <div className={s.at}>at</div>
                                        <div className={s.field}>
                                            <input className={s.dateInput} type="time" value={timeSpecDate} onChange={(e)=> setTimeSpecDate(e.target.value)} onClick={()=>{setTimeSpecDateError("")}}></input>
                                            <div className={s.error}>{timeSpecDateError}</div>
                                        </div>
                                    </div>
                                </div>,
                            "Daily":
                                <div className={s.modalReportName}>
                                    <label className={s.label} for="time">Everyday at</label>
                                    <div className={s.fieldContainer}>
                                        <div className={s.field}>
                                            <input className={s.dateInput} id="time" type="time" value={timeDaily} onChange={(e)=> setTimeDaily(e.target.value)} onClick={()=>{setTimeDailyError("")}}></input>
                                            <div className={s.error}>{timeDailyError}</div>
                                        </div>
                                    </div>
                                </div>,
                            "Weekly":
                                <div className={s.modalReportName}>
                                    <label className={s.label} >Every</label>
                                    <div className={s.fieldContainer}>
                                        <div className={s.field}>
                                            <DropDown
                                                flag={flag}
                                                setFlag={setFlag}
                                                selectedDayOption={selectedDayOption}
                                                setDayOption={setDayOption}
                                                days={days}
                                            />
                                            <div className={s.error}>{dayError}</div>
                                        </div>
                                        <div className={s.at}>at</div>
                                        <div className={s.field}>
                                            <input className={s.dateInput} id="time" type="time" value={timeWeekly} onChange={(e)=> setTimeWeekly(e.target.value)} onClick={()=>{setTimeWeeklyError("")}}></input>
                                            <div className={s.error}>{timeWeeklyError}</div>
                                        </div>
                                    </div>
                                </div>,
                        }[selectedScheduleOption]
                    }

                </div>
                <div className={s.modalFooter}>
                    {
                        isSuccess === true
                        ?
                        <div className={s.responseContainer}>
                            <div className={s.responseInfo}>{response}</div>
                            <button className={s.button} onClick={()=>clearData()}>Clear</button>
                        </div>
                        :
                        <div></div>
                    }
                    <div>
                        <button className={s.button} onClick={()=>setActiveModal(false)}>Cancel</button>
                        <button className={s.button} onClick={()=>sendModalForm()}>OK</button>
                    </div>
                </div>

            </Modal>
            : null}
        </div>
    );
}

export default App;




