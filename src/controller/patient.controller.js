import database from '../config/mysql.config.js'
import Response from '../domain/response.js'
import logger from '../util/logger.js'
import QUERY from '../query/patient.query.js'

const HttpStatus = {
  OK: { code: 200, status: "OK" },
  CREATED: { code: 203, status: "CREATED" },
  NO_CONTENT: { code: 204, status: "NOT CONTENT" },
  BAD_REQUEST: { code: 400, status: "BAD REQUEST" },
  NOT_FOUND: { code: 404, status: "NOT FOUND" },
  INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL SERVER ERROR" },
}

export const get_patients = (req, res) => {
  logger.info(`${req.method} ${req.originalurl}, fetching patients`)
  database.query(QUERY.SELECT_PATIENTS, (error, results) => {
    if (error) {
      res.status(HttpStatus.NO_CONTENT.code).send(new Response(
        HttpStatus.NO_CONTENT.code,
        HttpStatus.NO_CONTENT.status,
        `No patients found`
      ))
    } else {
      res.status(HttpStatus.OK.code).send(new Response(
        HttpStatus.OK.code,
        HttpStatus.OK.status,
        `Patients Retrieved`, { patients: results }
      ))
    }
  })
}

export const create_patient = (req, res) => {
  logger.info(`${req.method} ${req.originalurl}, create patients`)
  database.query(QUERY.CREATE_PATIENT, Object.values(req.body), (error, results) => {
    if (error) {
      logger.error(error.message)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(
        HttpStatus.INTERNAL_SERVER_ERROR.code,
        HttpStatus.INTERNAL_SERVER_ERROR.status,
        `Error occured`
      ))
    } else {
      const patient = { id: results.insertedId, ...req.body, created_at: new Date() }
      res.status(HttpStatus.OK.code).send(new Response(
        HttpStatus.CREATED,
        HttpStatus.CREATED.status,
        `Patients Creted`, { patient }
      ))
    }
  })
}

export const get_patient = (req, res) => {
  logger.info(`${req.method} ${req.originalurl}, fetching patient`)
  database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
    if (error) {
      logger.error(error.message)
      res.status(HttpStatus.NOT_FOUND.code).send(new Response(
        HttpStatus.NOT_FOUND.code,
        HttpStatus.NOT_FOUND.status,
        `Patient by i ${req.params.id} not found`
      ))
    } else {
      const patient = { id: results.insertedId, ...req.body, created_at: new Date() }
      res.status(HttpStatus.OK.code).send(new Response(
        HttpStatus.OK,
        HttpStatus.OK.status,
        `Patients Creted`, { patient }
      ))
    }
  })
}

export const update_patient = (req, res) => {
  logger.info(`${req.method} ${req.originalurl}, fetching patients`)
  database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
    if (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(
        HttpStatus.INTERNAL_SERVER_ERRORcode,
        HttpStatus.INTERNAL_SERVER_ERROR.status,
        `INTERNAL SERVER ERROR`
      ))
    }

    if (!results[0]) {
      res.status(HttpStatus.NOT_FOUND.code).send(new Response(
        HttpStatus.NOT_FOUND.code,
        HttpStatus.NOT_FOUND.status,
        `Patient by id ${req.params.id} was not found`
      ))
    } else {
      logger.info(`${req.method} ${req.originalurl}, updating patients`)
      database.query(QUERY.UPDATE_PATIENT, [...Object.values(req.body), req.params.id], (error) => {
        if (error) {
          logger.info(`${req.method} ${req.originalurl}, ${error}`)
          res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(
            HttpStatus.INTERNAL_SERVER_ERROR.code,
            HttpStatus.INTERNAL_SERVER_ERROR.status,
            `INTERNAL_SERVER_ERROR`
          ))
        }
        res.status(HttpStatus.OK.code).send(new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          `Patient update`,
          { id: req.params.id, ...req.body }
        ))
      })
    }
  })
}

export const delete_patient = (req, res) => {
  logger.info(`${req.method} ${req.originalurl}, deleting patient`)
  database.query(QUERY.DELETE_PATIENT, [req.params.id], (error, results) => {
    if (results.affectedRowns > 0) {
      res.status(HttpStatus.DELETE_PATIENT.code).send(new Response(
        HttpStatus.DELETE_PATIENT.code,
        HttpStatus.DELETE_PATIENT.status,
        `Patient deleted`,
        results[0]
      ))
    } else {
      res.status(HttpStatus.NOT_FOUND.code).send(new Response(
        HttpStatus.NOT_FOUND.code,
        HttpStatus.NOT_FOUND.status,
        `Patient  by id ${req.params.id} was not found`
      ))
    }
  })
}

export default HttpStatus;
