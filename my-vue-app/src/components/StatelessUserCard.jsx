function StatelessUserCard({ name, age }) {
  return (
    <div style={{ padding: '20px', backgroundColor: '#111', color: '#fff', margin: '10px', textAlign: 'center'}}>
      <h3>Stateless User Card</h3>
      <p>Ім'я: {name}</p>
      <p>Вік: {age}</p>
    </div>
  );
}

export default StatelessUserCard;
