import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Diagnosis, Patient } from "../types";
import patientService from "../services/patients";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import EntryDetails from "./EntryDetails";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      const data = await patientService.getById(id);
      setPatient(data);
    };
    void fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
      setDiagnoses(data);
      console.log(diagnoses);
    };

    void fetchDiagnoses();
  }, []);

  const getDiagnosisName = (code: string) =>
    diagnoses.find((d) => d.code === code)?.name;

  if (!patient) return <div>Loading...</div>;

  const genderIcon = {
    male: <MaleIcon />,
    female: <FemaleIcon />,
    other: <TransgenderIcon />,
  }[patient.gender];

  return (
    <div>
      <Typography variant="h4" style={{ marginBottom: "1rem" }}>
        {patient.name} {genderIcon}
      </Typography>

      <Typography>SSN: {patient.ssn}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      <Typography>Date of birth: {patient.dateOfBirth}</Typography>

      <Typography variant="h5" style={{ marginTop: "2rem" }}>
        Entries
      </Typography>

      {patient.entries.length === 0 && <p>No entries yet.</p>}

      {patient.entries.map((entry) => (
        <div key={entry.id} style={{ marginBottom: "1rem" }}>
          <Typography variant="subtitle1">{entry.date}</Typography>

          <Typography>{entry.description}</Typography>

          {patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
