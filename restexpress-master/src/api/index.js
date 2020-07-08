import { Router } from 'express'
import { env, mongo, port, ip, apiRoot } from '~/config'
import { doorman } from '~/services/auth/guard'
/* ENDPOINT_ROUTER_IMPORT */
import exam, { Exam } from './exam'
import auth from './auth'
import verification from './verification'
import passwordReset from './password-reset'
import user, { User } from './user'
import message, { Message } from './message'

const router = new Router()

/* ENDPOINT_ROUTER_EXPORT */
router.use('/exams', exam)
router.use('/auth', auth)
router.use('/verification', verification)
router.use('/users', user)
router.use('/messages', message)
router.use('/password-reset', passwordReset)

// Export the relevant models for swagger documentation
export const Models = [
    /* ENDPOINT_DOCS_EXPORT */
Exam,
    User,
    Message
]

// Export router for Express Server
export default router
