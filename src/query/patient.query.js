const QUERY = {
  // Select all patients from the database
  SELECT_PATIENTS: 'SELECT * FROM patients ORDEM BY created_at DESC LIMIT 100',
  // Select a patient from the database
  SELECT_PATIENT: 'SELECT * FROM WHERE id = ?',
  // Register a new patient in the database
  CREATE_PATIENT: 'INSERT INTO patients (first_name, last_name, email, address, diagnosis, phone, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
  // Update a patient in the database
  UPDATE_PATIENT: 'UPDATE patients SET first_name = ?, last_name = ?, email = ?, address = ?, diagnosis = ?, phone = ?, image_url = ? WHERE id = ?',
  // Delete the patient from the database 
  DELETE_PATIENT: 'DELETE FROM patients WHERE id = ?'
}

export default QUERY
