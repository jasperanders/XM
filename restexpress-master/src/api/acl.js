import { merge, flow, groupBy, mapValues, map, omit } from 'lodash'
/* ENDPOINT_ACL_IMPORT */
import messageAcl from './message/acl'
import authAcl from './auth/acl'
import userAcl from './user/acl'
import verificationAcl from './verification/acl'
import passwordResetAcl from './password-reset/acl'

const defaultPermissions = []

const permissions = {
    ...groupBy([
        /* ENDPOINT_ACL_EXPORT */
        ...defaultPermissions,
        ...messageAcl,
        ...authAcl,
        ...userAcl,
        ...verificationAcl,
        ...passwordResetAcl
    ],'group')
}

Object.keys(permissions).forEach((group) => {
    permissions[group] = permissions[group].reduce((accu, curr) => {
        return { group, permissions: accu.permissions.concat(curr.permissions)}
    })
})

export default Object.values(permissions)
