import { useEffect, useState } from "react";
import { create, getAll } from "./services/diaryService";
import type { DiaryEntry, NewDiaryEntry } from "./types";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    getAll().then((data) => setDiaries(data));
  }, []);

  const addDiary = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newEntry: NewDiaryEntry = {
      date,
      weather: weather as any,
      visibility: visibility as any,
      comment,
    };

    const saved = await create(newEntry);
    setDiaries(diaries.concat(saved));

    setDate("");
    setWeather("");
    setVisibility("");
    setComment("");
  };

  return (
    <div>
      <h1>Flight Diaries</h1>

      <h2>Add new entry</h2>
      <form onSubmit={addDiary}>
        <div>
          date: <input value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          weather:{" "}
          <input value={weather} onChange={(e) => setWeather(e.target.value)} />
        </div>
        <div>
          visibility:{" "}
          <input
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div>
          comment:{" "}
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Diaries</h2>
      {diaries.map((d) => (
        <div key={d.id} style={{ marginBottom: "1rem" }}>
          <h3>{d.date}</h3>
          <p>Weather: {d.weather}</p>
          <p>Visibility: {d.visibility}</p>
          {d.comment && <p>Comment: {d.comment}</p>}
        </div>
      ))}
    </div>
  );
}

export default App;
