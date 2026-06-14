import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

export const create = async (entry: NewDiaryEntry): Promise<DiaryEntry> => {
  const res = await axios.post<DiaryEntry>(baseUrl, entry);
  return res.data;
};
