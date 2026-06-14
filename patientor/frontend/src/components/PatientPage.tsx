import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Patient } from "../types";
import patientService from "../services/patients";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      const data = await patientService.getById(id);
      setPatient(data);
    };
    void fetchPatient();
  }, [id]);

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
    </div>
  );
};

export default PatientPage;
