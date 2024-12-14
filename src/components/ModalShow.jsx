import AlarmOn from "../assets/alarmon.png";
import AlarmOff from "../assets/alarmoff.png";
import styles from "./ModalShow.module.css";
import { useState, useEffect } from "react";
import DetailsBox from "./DetailsBox";
import Form from "./Form";
import axios from "axios";

const ModalShow = (props) => {
    if (!props.show) return null;
    const [isSorted, setIsSorted] = useState(false);
    const [dataData, setDataData] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [formModalState, setFormModalState] = useState(false);

    useEffect(() => {
        if (isSorted) {
            const sorted = [...props.data].sort((a, b) => a.familyName.localeCompare(b.familyName));
            setDataData(sorted);
        } else {
            setDataData(props.data);
        }
            
    }, [isSorted, props.data]);

    function handleClickDetails(patient) {
            setSelectedPatient(patient);
            // if (props.onClose) {
            //     props.onClose();
            //     alert("seletedState:");
            // }
    }

    const updateDataBase = async (patient) => {
        try {
            const response = await axios.post('https://mobile.digistat.it/CandidateApi/Patient/Update', patient, {
                auth: {
                    username: import.meta.env.VITE_API_USERNAME,
                    password: import.meta.env.VITE_API_PASSWORD,
                },
            });
            console.log("Parameter updated", response.data);
        } catch (error) {
            console.log('Error updating parameter', error);
        }
    }

    const handleDeleteParameter = async (paramId) => {
        const updatedParameters = selectedPatient.parameters
            .filter(parameter => parameter.id !== paramId)
            .map((parameter, index) => ({ ...parameter, id: index }));
    
        const updatedPatient = {
            ...selectedPatient, 
            parameters: updatedParameters
        };
    
        const updatedPatients = props.patients.map((patient) =>
            patient.id === updatedPatient.id ? updatedPatient : patient
        );
    
        setSelectedPatient(updatedPatient);
        console.log("Sending updated data to server:", updatedPatient);
        await updateDataBase(updatedPatients);
    
        props.setPatients(updatedPatients);
    };
        
    const Data = dataData.map((patient, index) => {
        return (
            <tr key={index}>
                <td className={styles.tr} onClick={() => handleClickDetails(patient)}>{patient.id}</td>
                <td className={styles.tr} onClick={() => handleClickDetails(patient)}>{patient.familyName}</td>
                <td className={styles.tr} onClick={() => handleClickDetails(patient)}>{patient.givenName}</td>
                <td className={styles.tr} onClick={() => handleClickDetails(patient)}>{patient.birthDate}</td>
                <td className={styles.tr} onClick={() => handleClickDetails(patient)}>{patient.sex}</td>
                <td className={styles.tr} onClick={() => handleClickDetails(patient)}>{patient.parameters.length}</td>
                <td className={styles.tr} onClick={() => handleClickDetails(patient)}>{checkAlarm(patient)}</td>
            </tr>
        );
    });

    function checkAlarm(patient) {
       for (let i = 0; i < patient.parameters.length; i++)
       {
            if (patient.parameters[i].alarm)
                return <img src={AlarmOn} className={styles.icon} alt="Alarm On" />;
       }
         return <img src={AlarmOff} className={styles.icon} alt="Alarm Off" />;
    };

    function handleSortChange(e) {
        setIsSorted(e.target.checked);
    }

    async function handleFormSubmit(formData) {
        //console.log(formData);
        const updatedPatients = [...props.patients, formData];
        props.setPatients(updatedPatients);
        setFormModalState(false);

        try {
            const response = await axios.post('https://mobile.digistat.it/CandidateApi/Patient/Add', formData, {
                auth: {
                    username: import.meta.env.VITE_API_USERNAME,
                    password: import.meta.env.VITE_API_PASSWORD,
                },
            });
            if (response.status !== 200)
                console.log("Patients added unsuccessfully");
            console.log("Patient added", response.data);
        } catch (error) {
            console.log('Error adding patient', error);
        }
    }

    return (
        <>
            <div className={styles.fullelement}> 
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <th className={styles.tr}>ID</th>
                            <th className={styles.tr}>Family Name</th>
                            <th className={styles.tr}>Given Name</th>
                            <th className={styles.tr}>Date of Birth</th>
                            <th className={styles.tr}>Sex</th>
                            <th className={styles.tr}>Parameters</th>
                            <th className={styles.tr}>Alarm</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {Data}
                    </tbody>
                </table>
                <div className={styles.buttons}>
                    <button onClick={props.onClose} className={styles.button}>Close</button>
                    {props.modalState && (
                        <button
                            className={styles.button}
                            onClick={() => setFormModalState(!formModalState)}
                        >
                            Add Patient
                            </button>
                    )}
                </div>
                {props.modalState && (<label>
                    <input 
                    type = "checkbox"
                    name="sort"
                    value="familyName"
                    id="familyName"
                    onChange={handleSortChange}
                    />
                    <h3 className={styles.h3333}>Sort by Family Name</h3>
                </label>)}

            </div>
            {selectedPatient && (
                <div className={styles.detailsbox}>
                    <DetailsBox 
                        onClose={() => setSelectedPatient(null)}
                        patient={selectedPatient}
                        checkAlarm={checkAlarm(selectedPatient)}
                        onDeleteParameter={handleDeleteParameter}
                        updateDataBase={updateDataBase}
                        updateSelectedPatient={setSelectedPatient}
                        updatePatients={props.setPatients}
                    />
                </div>
            )}
            <div>
                {formModalState && (
                    <>
                    <Form 
                        data={props.patients}
                        onSubmit={handleFormSubmit}
                    />
                    </>
                )}
            </div>
            <div style={{ height: '300px' }}></div>
        </>
    );
};

export default ModalShow;