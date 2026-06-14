import type { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled course part: ${JSON.stringify(value)}`);
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
          <br />
          <em>{part.description}</em>
        </p>
      );

    case "group":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
          <br />
          Group projects: {part.groupProjectCount}
        </p>
      );

    case "background":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
          <br />
          <em>{part.description}</em>
          <br />
          Background: {part.backgroundMaterial}
        </p>
      );

    case "special":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
          <br />
          <em>{part.description}</em>
          <br />
          Requirements: {part.requirements.join(", ")}
        </p>
      );

    default:
      return assertNever(part);
  }
};

export default Part;
