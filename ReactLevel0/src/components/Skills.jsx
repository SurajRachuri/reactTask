export function Skills() {
  const skills = ["JavaScript", "React", "CSS"];

  return (
    <section className="section">
      <h2>Skills</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}
