/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.jsx                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: aeid <aeid@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/12/14 19:32:33 by aeid              #+#    #+#             */
/*   Updated: 2024/12/14 19:32:35 by aeid             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { useState, useEffect } from 'react';
import React from 'react';
import Card from './components/Card.jsx';
import styles from './components/Card.module.css';
import Header from './components/Header.jsx';
import ModalShow from './components/ModalShow.jsx';
import axios from 'axios';


function App() {

  const [modalState, setModalState] = useState(false);
  const [searchModalState, setSearchModalState] = useState(false);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState('');
  const [searchFamilyName, setSearchFamilyName] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
        try {
            const response = await axios.get('https://mobile.digistat.it/CandidateApi/Patient/GetList', {
                auth: {
                    username: import.meta.env.VITE_API_USERNAME,
                    password: import.meta.env.VITE_API_PASSWORD,
                },
            });
            if (response.status !== 200)
                console.log("Patients fetched unsuccessfully");
            setPatients(response.data);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching patients', error);
        }
    };
    fetchPatients();
}, []);

useEffect(() => {
    const fetchFilteredPatients = async () => {
        if (!searchId && !searchFamilyName) {
            return;
        }
        try {
            if (searchId) {
                const response = await axios.get(`https://mobile.digistat.it/CandidateApi/Patient/Get/${searchId}`, {
                    auth: {
                        username: import.meta.env.VITE_API_USERNAME,
                        password: import.meta.env.VITE_API_PASSWORD,
                    },
                });
                if (response.status !== 200)
                    console.log("Patients fetched unsuccessfully");
                setFilteredPatients([response.data]);
            } else if (searchFamilyName) {
                const filtered = patients.filter(patient => patient.familyName.toLowerCase() === searchFamilyName.toLowerCase());
                setFilteredPatients(filtered);
            }
        } catch (error) {
            console.log('Could not find patient', error);
        }
    };
    fetchFilteredPatients();
}, [searchId, searchFamilyName, patients]);

if (loading) {
    return <p> Loading...</p>;
}

  function handleClick() {
    if (searchModalState) {
        setSearchModalState(false);
    }
    setModalState(!modalState);
}

  function handleSearchClick() {
      if (modalState) {
          setModalState(false);
      }   
      setSearchModalState(!searchModalState);
  }

  const handleButtonClick = (buttonState, selectedOption) => {
    if (buttonState === "Show" && !modalState) {
        setSearchModalState(false);
        setModalState((prev) => !prev);
    } else if (buttonState === "Search" && !searchModalState) {
        setModalState(false);
        setSearchModalState((prev) => !prev);
    }

    if (selectedOption === "ID") {
        setSearchId(searchId);
    } else {
        const filtered = patients.filter((patient) => patient.familyName.toLowerCase() === searchFamilyName.toLowerCase());
        setFilteredPatients(filtered);
    }
};

  return (
      <div className={styles.card}>
        <Header />
        <div className={styles.cardsection}>
          <Card 
            image='./src/assets/getlist.png'
            alt='getlist'
            h3= "Patient's list"
            button="Show"
            imgclass = 'image'
            handleButtonClick={handleButtonClick}
            h3class = 'h3'
            />
          <Card 
            image='./src/assets/searchbyid.png'
            alt='searchbyid'
            h3= "Search by ID"
            button="Search"
            imgclass = 'image2'
            h3class = 'h32'
            input='Search'
            searchId={searchId}
            setSearchId={setSearchId}
            searchFamilyName={searchFamilyName}
            setSearchFamilyName={setSearchFamilyName}
            handleButtonClick={handleButtonClick}
            patients={patients}
          />
        </div>
        <>
            <>
        {modalState && (
            <ModalShow
                    show={modalState}
                    modalState={true}
                    onClose={handleClick}
                    className="fullelement"
                    data={patients}
                    patients={patients}
                    setPatients={setPatients}
            />
        )}
            </>
            <>
        {searchModalState && (
            <ModalShow
                    show={searchModalState}
                    modalState={false}
                    onClose={handleSearchClick}
                    className="fullelement"
                    data={filteredPatients}
                    patients={patients}
                    setPatients={setPatients}
            />
        )}
            </>
        </>
      </div>
  );
};


export default App;