import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (entry: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
  error?: string;
}

const AddEntryModal = ({
  open,
  onClose,
  onSubmit,
  diagnoses,
  error,
}: Props) => {
  const [type, setType] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare"
  >("HealthCheck");

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [rating, setRating] = useState(0);

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const [employerName, setEmployerName] = useState("");
  const [sickStart, setSickStart] = useState("");
  const [sickEnd, setSickEnd] = useState("");

  const submit = () => {
    let entry: EntryWithoutId;

    switch (type) {
      case "HealthCheck":
        entry = {
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          healthCheckRating: rating as HealthCheckRating,
        };
        break;

      case "Hospital":
        entry = {
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;

      case "OccupationalHealthcare":
        entry = {
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave:
            sickStart && sickEnd
              ? { startDate: sickStart, endDate: sickEnd }
              : undefined,
        };
        break;
    }

    onSubmit(entry);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add Entry</DialogTitle>
      <DialogContent>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <FormControl fullWidth margin="normal">
          <InputLabel>Entry Type</InputLabel>
          <Select
            value={type}
            label="Entry Type"
            onChange={(e) => setType(e.target.value as any)}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Description"
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          fullWidth
          type="date"
          label="Date"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <TextField
          fullWidth
          label="Specialist"
          margin="normal"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={(e) => setDiagnosisCodes(e.target.value as string[])}
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code} {d.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {type === "HealthCheck" && (
          <TextField
            fullWidth
            type="number"
            label="Health Rating (0–3)"
            margin="normal"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        )}

        {type === "Hospital" && (
          <>
            <TextField
              fullWidth
              type="date"
              label="Discharge Date"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
            />

            <TextField
              fullWidth
              label="Discharge Criteria"
              margin="normal"
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
            />
          </>
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <TextField
              fullWidth
              label="Employer Name"
              margin="normal"
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
            />

            <TextField
              fullWidth
              type="date"
              label="Sick Leave Start"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={sickStart}
              onChange={(e) => setSickStart(e.target.value)}
            />

            <TextField
              fullWidth
              type="date"
              label="Sick Leave End"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={sickEnd}
              onChange={(e) => setSickEnd(e.target.value)}
            />
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEntryModal;
