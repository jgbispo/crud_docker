import express from "express"

import {
  create_patient,
  get_patients,
  get_patient,
  update_patient,
  delete_patient
} from '../controller/patient.controller.js'

const patient_routes = express.Router()

patient_routes.route('/')
  .get(get_patients)
  .post(create_patient)

patient_routes.route('/:id')
  .get(get_patient)
  .put(update_patient)
  .delete(delete_patient)

export default patient_routes
