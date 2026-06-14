import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";
import { Typography, Box } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface Props {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const HealthCheckDetails = ({ entry }: { entry: HealthCheckEntry }) => (
  <Box border={1} borderRadius={2} padding={2} marginY={1}>
    <Typography variant="h6">
      {entry.date} <MedicalServicesIcon />
    </Typography>
    <Typography>{entry.description}</Typography>
    <FavoriteIcon color={entry.healthCheckRating === 0 ? "success" : "error"} />
    <Typography>Diagnose by {entry.specialist}</Typography>
  </Box>
);

const HospitalDetails = ({ entry }: { entry: HospitalEntry }) => (
  <Box border={1} borderRadius={2} padding={2} marginY={1}>
    <Typography variant="h6">
      {entry.date} <LocalHospitalIcon />
    </Typography>
    <Typography>{entry.description}</Typography>
    <Typography variant="body2">
      Discharge: {entry.discharge.date} - {entry.discharge.criteria}
    </Typography>
  </Box>
);

const OccupationalDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => (
  <Box border={1} borderRadius={2} padding={2} marginY={1}>
    <Typography variant="h6">
      {entry.date} <WorkIcon /> {entry.employerName}
    </Typography>
    <Typography>{entry.description}</Typography>
    {entry.sickLeave && (
      <Typography variant="body2">
        Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
      </Typography>
    )}
  </Box>
);

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckDetails entry={entry} />;
    case "Hospital":
      return <HospitalDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
