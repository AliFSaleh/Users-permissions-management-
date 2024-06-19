import {array, object, string, TypeOf} from 'zod'


export const createRoleSchema = object({
    body: object({
        name: string({
            required_error: 'Name filed is required'
        }),

        permissionIds: array(string().uuid())
    })
})

export type createRoleInputs = TypeOf<typeof createRoleSchema>['body']
