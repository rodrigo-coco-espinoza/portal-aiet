function NotasInforme() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-[5px] text-gris-800">Notas</h1>
      <ul className="list-disc text-sm">
        <li>Asistencia del mes/proyecto: Este indicador refleja el porcentaje de asistencia de los investigadores en relación con el total de bloques asignados para el mes o para el proyecto en su totalidad.</li>
        <li>Uso de horas asignadas: Se refiere al número total de horas que los investigadores emplearon en el uso del equipo, comparado con el total de horas asignadas en el periodo (con una asignación de 2,5 horas por bloque).</li>
        <li>Uso fuera de horario: Representa la suma de tiempo que los investigadores utilizaron el equipo fuera del horario asignado, ya sea antes o después de las horas programadas.</li>
        <li>Jornada extra: Corresponde a una asistencia no prevista inicialmente, que ocurrió por razones específicas no contempladas en el proyecto original.</li>
      </ul>
    </div>
  );
}

export default NotasInforme;